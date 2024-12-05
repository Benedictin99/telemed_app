import React, { useState } from "react";

const BluetoothComponent = () => {
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState("Non connecté");
  const [receivedData, setReceivedData] = useState("");

  const connectBluetooth = async () => {
    try {
      setStatus("Recherche de périphérique...");

      // Demande de périphérique Bluetooth
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["00001101-0000-1000-8000-00805f9b34fb"], // UUID standard HC-05
      });

      setDevice(device);
      setStatus(`Connecté à : ${device.name}`);

      // Connexion au GATT Server
      const server = await device.gatt.connect();

      // Récupération du service et de la caractéristique
      const service = await server.getPrimaryService(
        "00001101-0000-1000-8000-00805f9b34fb"
      );
      const characteristic = await service.getCharacteristic(
        "00002a37-0000-1000-8000-00805f9b34fb"
      );

      // Écoute des notifications de la caractéristique
      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = new TextDecoder().decode(event.target.value);
        setReceivedData(value);
        console.log("Données reçues : ", value);
      });

      await characteristic.startNotifications();
    } catch (error) {
      console.error("Erreur de connexion Bluetooth : ", error);
      setStatus("Erreur : " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold mb-4">Connexion Bluetooth</h1>
      <p>Status : {status}</p>
      <button
        onClick={connectBluetooth}
        className="px-4 py-2 mt-4 bg-blue-500 text-white rounded shadow"
      >
        Connecter Bluetooth
      </button>
      {receivedData && (
        <p className="mt-4 p-4 bg-gray-200 rounded">
          Données reçues : {receivedData}
        </p>
      )}
    </div>
  );
};

export default BluetoothComponent;
