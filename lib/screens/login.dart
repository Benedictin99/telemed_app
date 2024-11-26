// import 'package:flutter/material.dart';
// import 'package:telemed_app/widget/InputTextWidget.dart';

// class MyFormScreen extends StatefulWidget {
//   const MyFormScreen({super.key});

//   @override
//   _MyFormScreenState createState() => _MyFormScreenState();
// }

// class _MyFormScreenState extends State<MyFormScreen> {
//   final _phoneController = TextEditingController();
//   final _emailController = TextEditingController();

//   final _formKey = GlobalKey<FormState>();

//   // FocusNode pour suivre le focus du champ de texte
//   final FocusNode _phoneFocusNode = FocusNode();
//   final FocusNode _emailFocusNode = FocusNode();

//   String? validatePhoneNumber(String value) {
//     if (value.isEmpty) {
//       return 'Le numéro de téléphone est obligatoire.';
//     }
//     if (value.length != 10) {
//       return 'Le numéro doit contenir exactement 10 chiffres.';
//     }
//     if (!['032', '033', '034'].contains(value.substring(0, 3))) {
//       return 'Le numéro doit commencer par 032, 033 ou 034.';
//     }
//     return null; // Valide
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar:
//           AppBar(title: const Text('Formulaire avec validation automatique')),
//       body: Padding(
//         padding: const EdgeInsets.all(16.0),
//         child: Form(
//           key: _formKey, // Assignation de la clé du formulaire
//           child: Column(
//             crossAxisAlignment: CrossAxisAlignment.start,
//             children: [
//               InputTextWidget(
//                 controller: _phoneController,
//                 labelText: 'Téléphone',
//                 hintText: 'Entrez votre numéro de téléphone',
//                 keyboardType: TextInputType.phone,
//                 focusNode: _phoneFocusNode,
//                 prefixIcon: Icons.phone_android_outlined,
//                 validator: (value) {
//                   if (value!.isEmpty) {
//                     return 'Le numéro de téléphone est obligatoire.';
//                   }
//                   if (value.length != 10) {
//                     return 'Le numéro doit contenir exactement 10 chiffres.';
//                   }
//                   if (!['032', '033', '034'].contains(value.substring(0, 3))) {
//                     return 'Le numéro doit commencer par 032, 033 ou 034.';
//                   }
//                   return null;
//                 },
//               ),
//               const SizedBox(height: 16),
//               InputTextWidget(
//                 controller: _emailController,
//                 labelText: 'Adresse email',
//                 hintText: 'Ex : email@gmail.com',
//                 keyboardType: TextInputType.emailAddress,
//                 focusNode: _emailFocusNode,
//                 prefixIcon: Icons.email_outlined,
//                 validator: (value) {
//                   if (value == null || value.isEmpty) {
//                     return 'Veuillez entrer un e-mail';
//                   }
//                   if (!value.contains('@') || !value.contains('.')) {
//                     return 'E-mail invalide';
//                   }
//                   return null;
//                 },
//               ),
//               const SizedBox(height: 16),
//               ElevatedButton(
//                 onPressed: () {
//                   // Valider tous les champs du formulaire
//                   if (_formKey.currentState?.validate() ?? false) {
//                     // Si la validation passe, afficher les valeurs
//                     print('Numéro: ${_phoneController.text}');
//                     print('E-mail: ${_emailController.text}');
//                   } else {
//                     // Si la validation échoue, afficher un message d'erreur
//                     print('Validation échouée');
//                   }
//                 },
//                 child: const Text('Soumettre'),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }
