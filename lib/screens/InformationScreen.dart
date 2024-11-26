// import 'package:flutter/material.dart';
// import 'package:flutter/services.dart';
// import 'package:telemed_app/widget/AnimationWidget.dart';
// import 'package:telemed_app/widget/BouttonWidget.dart';
// import 'package:telemed_app/widget/InputTextWidget.dart';
// import 'package:telemed_app/screens/HomeScreen.dart';

// class InformationScreen extends StatefulWidget {
//   const InformationScreen({super.key});

//   @override
//   State<InformationScreen> createState() => _InformationScreenState();
// }

// class _InformationScreenState extends State<InformationScreen> {
//   final TextEditingController _nomController = TextEditingController();
//   final TextEditingController _prenomController = TextEditingController();
//   final TextEditingController _phoneController = TextEditingController();
//   // final TextEditingController _adresseController = TextEditingController();

//   final key = GlobalKey<FormState>();

//   var day = DateTime.now().day;
//   var month = DateTime.now().month;
//   var year = DateTime.now().year;

//   void _register() {
//     // var nom = _nomController.text;
//     // var prenom = _prenomController.text;
//     // var phone = _phoneController.text;
//     // var province = _provinceController.text;
//     // var adresse = _adresseController.text;

//     Navigator.of(context).pushReplacement(
//       MaterialPageRoute(
//         builder: (context) => const HomeScreen(),
//       ),
//     );
//   }

//   void _datePicker() {
//     showDatePicker(
//       context: context,
//       initialDate: DateTime.now(),
//       firstDate: DateTime(1900),
//       lastDate: DateTime(2025),
//       confirmText: "Confirmer",
//       cancelText: "Annuler",
//       // barrierDismissible: false,
//     ).then((value) {
//       setState(() {
//         day = value!.day;
//         month = value.month;
//         year = value.year;
//       });
//     });
//   }

//   @override
//   Widget build(BuildContext context) {
//     Size size = MediaQuery.of(context).size;

//     return Scaffold(
//       body: SafeArea(
//         child: SingleChildScrollView(
//           child: Center(
//             child: Column(
//               children: [
//                 AnimationWidget(
//                   delay: const Duration(milliseconds: 100),
//                   beginOffset: const Offset(0, -1),
//                   child: Padding(
//                     padding: const EdgeInsets.all(8.0),
//                     child: SizedBox(
//                       height: size.height / 4.5,
//                       child: Image.asset('assets/add.png'),
//                     ),
//                   ),
//                 ),
//                 const AnimationWidget(
//                   delay: Duration(milliseconds: 200),
//                   child: Text(
//                     'Veuiller entrer vos informations \n personnels',
//                     style: TextStyle(
//                       fontSize: 25,
//                       fontWeight: FontWeight.bold,
//                     ),
//                     textAlign: TextAlign.center,
//                   ),
//                 ),
//                 Padding(
//                   padding: const EdgeInsets.symmetric(horizontal: 15.0),
//                   child: Form(
//                     key: key,
//                     child: Column(
//                       children: [
//                         InputTextWidget(
//                           label: 'Téléphone',
//                           hintText: 'Entrez votre numéro de téléphone',
//                           controller: _phoneController,
//                           keyboardType: TextInputType.phone,
//                           inputFormatters: [
//                             FilteringTextInputFormatter.digitsOnly,
//                             LengthLimitingTextInputFormatter(10),
//                           ],
//                           validator: (value) {
//                             if (value == null || value.isEmpty) {
//                               return 'Le champ téléphone est requis.';
//                             }
//                             if (value.length != 10 ||
//                                 !['032', '033', '034']
//                                     .contains(value.substring(0, 3))) {
//                               return 'Numéro invalide. Utilisez un préfixe 032, 033 ou 034.';
//                             }
//                             return null;
//                           },
//                         ),
//                         const SizedBox(height: 20),
//                         InputTextWidget(
//                           label: 'Email',
//                           hintText: 'Entrez votre adresse email',
//                           controller: _nomController,
//                           keyboardType: TextInputType.emailAddress,
//                           validator: (value) {
//                             if (value == null || value.isEmpty) {
//                               return 'Le champ email est requis.';
//                             }
//                             if (!RegExp(r'^[^@]+@[^@]+\.[^@]+')
//                                 .hasMatch(value)) {
//                               return 'Adresse email invalide.';
//                             }
//                             return null;
//                           },
//                         ),
//                         const SizedBox(height: 20),
//                         InputTextWidget(
//                           label: 'Mot de passe',
//                           hintText: 'Entrez votre mot de passe',
//                           controller: _prenomController,
//                           obscureText: true,
//                           validator: (value) {
//                             if (value == null || value.isEmpty) {
//                               return 'Le mot de passe est requis.';
//                             }
//                             if (value.length < 6) {
//                               return 'Le mot de passe doit contenir au moins 6 caractères.';
//                             }
//                             return null;
//                           },
//                         ),
//                         Padding(
//                           padding: const EdgeInsets.symmetric(horizontal: 10.0),
//                           child: Row(
//                             children: [
//                               const AnimationWidget(
//                                 delay: Duration(milliseconds: 800),
//                                 beginOffset: Offset(-1, 0),
//                                 child: Text(
//                                   "Date de naissance : ",
//                                   style: TextStyle(fontSize: 20),
//                                 ),
//                               ),
//                               const SizedBox(width: 30),

//                               // Choisir la date de naissance
//                               AnimationWidget(
//                                 delay: const Duration(milliseconds: 800),
//                                 beginOffset: const Offset(1, 0),
//                                 child: MaterialButton(
//                                   color:
//                                       Theme.of(context).colorScheme.secondary,
//                                   shape: RoundedRectangleBorder(
//                                     side: const BorderSide(),
//                                     borderRadius: BorderRadius.circular(10),
//                                   ),
//                                   child: Row(
//                                     mainAxisAlignment:
//                                         MainAxisAlignment.spaceBetween,
//                                     children: [
//                                       Text(
//                                         day.toString(),
//                                         style: const TextStyle(
//                                           fontSize: 20,
//                                           color: Colors.black,
//                                         ),
//                                       ),
//                                       const SizedBox(width: 5),
//                                       const Text(
//                                         "/",
//                                         style: TextStyle(
//                                           fontSize: 20,
//                                           color: Colors.black,
//                                         ),
//                                       ),
//                                       const SizedBox(width: 5),
//                                       Text(
//                                         month.toString(),
//                                         style: const TextStyle(
//                                           fontSize: 20,
//                                           color: Colors.black,
//                                         ),
//                                       ),
//                                       const SizedBox(width: 5),
//                                       const Text(
//                                         "/",
//                                         style: TextStyle(
//                                           fontSize: 20,
//                                           color: Colors.black,
//                                         ),
//                                       ),
//                                       const SizedBox(width: 5),
//                                       Text(
//                                         year.toString(),
//                                         style: const TextStyle(
//                                           fontSize: 20,
//                                           color: Colors.black,
//                                         ),
//                                       ),
//                                     ],
//                                   ),
//                                   onPressed: () => _datePicker(),
//                                 ),
//                               ),
//                             ],
//                           ),
//                         ),

//                         // Boutton enregistrer
//                         AnimationWidget(
//                           delay: const Duration(milliseconds: 1000),
//                           child: Padding(
//                             padding: const EdgeInsets.symmetric(
//                               horizontal: 50,
//                               vertical: 10,
//                             ),
//                             child: BouttonWidget(
//                               height: size.height / 15,
//                               color: Theme.of(context).colorScheme.secondary,
//                               shapeColor:
//                                   Theme.of(context).colorScheme.tertiary,
//                               text: 'ENREGISTRER',
//                               onPressed: () {
//                                 if (key.currentState!.validate()) {
//                                   _register();
//                                 }
//                               },
//                             ),
//                           ),
//                         ),
//                       ],
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }
