import 'package:flutter/material.dart';
import 'package:telemed_app/widget/AnimationWidget.dart';
import 'package:telemed_app/widget/BouttonWidget.dart';
import 'package:telemed_app/widget/InputTextWidget.dart';

class ForgotPass extends StatefulWidget {
  const ForgotPass({super.key});

  @override
  State<ForgotPass> createState() => _ForgotPassState();
}

class _ForgotPassState extends State<ForgotPass> {
  final key = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();

  final FocusNode _emailFocusNode = FocusNode();

  bool _emailValid = false;
  bool _visitedEmail = false;

  String? _errorText;

  @override
  void initState() {
    super.initState();
    _emailFocusNode.addListener(() {
      if (!_emailFocusNode.hasFocus) {
        setState(() {
          _visitedEmail = true;
          validateEmail();
        });
      }
    });
  }

  @override
  void dispose() {
    _emailController.dispose();
    _emailFocusNode.dispose();

    super.dispose();
  }

  void validateEmail() {
    final email = _emailController.text;
    if (email.isEmpty) {
      _errorText = "Veuiller entrer votre adresse email";
    } else if (!email.contains('@') || !email.contains('.')) {
      _errorText = "L'adresse email n'est pas valide.";
    } else {
      setState(() {
        _emailValid = true;
      });
      _errorText = null;
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("RECUPÉRATION"),
        centerTitle: true,
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            child: Column(
              children: [
                const AnimationWidget(
                  child: Icon(
                    Icons.mail_lock_rounded,
                    color: Colors.amber,
                    size: 250,
                  ),
                ),
                const SizedBox(height: 20),
                const AnimationWidget(
                  delay: Duration(milliseconds: 200),
                  child: Text(
                    "Veuiller entrer votre \nadresse email pour recuperer votre compte",
                    textAlign: TextAlign.center,
                  ),
                ),
                const SizedBox(height: 10),
                Form(
                  key: key,
                  child: Column(
                    children: [
                      AnimationWidget(
                        delay: const Duration(milliseconds: 400),
                        child: Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: InputTextWidget(
                            labelText: 'Adresse email',
                            hintText: 'Ex : email@gmail.com',
                            errorText: _visitedEmail ? _errorText : null,
                            controller: _emailController,
                            keyboardType: TextInputType.emailAddress,
                            focusNode: _emailFocusNode,
                            prefixIcon: Icons.email_outlined,
                            validator: (value) {
                              if (value == null || value.isEmpty) {
                                setState(() {
                                  _visitedEmail = true;
                                  _emailValid = false;
                                });
                                return "Veuiller entrer votre adresse email";
                              } else if (!value.contains('@') ||
                                  !value.contains('.')) {
                                setState(() {
                                  _visitedEmail = true;
                                  _emailValid = false;
                                });
                                return "Adresse email invalide";
                              }
                              setState(() {
                                _visitedEmail = true;
                                _emailValid = true;
                              });
                              return null; // Retourne null si tout est correct
                            },
                            suffixIcon: _visitedEmail
                                ? _emailValid
                                    ? const Icon(
                                        Icons.verified_outlined,
                                        color: Colors.green,
                                      )
                                    : const Icon(
                                        Icons.error_outline,
                                        color: Colors.red,
                                      )
                                : null,
                          ),
                        ),
                      ),
                      const SizedBox(height: 30),
                      AnimationWidget(
                        delay: const Duration(milliseconds: 400),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 25.0),
                          child: BouttonWidget(
                            text: 'Réinitialiser',
                            onPressed: () {
                              if (key.currentState!.validate()) {
                                print(
                                    '=> Lien envoyer à ${_emailController.text}');
                              } else {
                                print('=> Erreur');
                              }
                            },
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                // const SizedBox(height: 10),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
