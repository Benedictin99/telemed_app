import 'package:flutter/material.dart';
import 'package:telemed_app/screens/ForgotPass.dart';
import 'package:telemed_app/screens/RegisterScreen.dart';
import 'package:telemed_app/widget/AnimationWidget.dart';
import 'package:telemed_app/screens/WelcomeScreen.dart';
import 'package:telemed_app/widget/BouttonWidget.dart';
import 'package:telemed_app/widget/InputTextWidget.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final key = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();

  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _passFocusNode = FocusNode();

  bool _emailValid = false;
  bool _passValid = false;
  bool _obscureText = true;

  bool _visitedEmail = false;
  bool _visitedPass = false;

  String? _errorEmailText;
  String? _errorPassText;

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

    _passFocusNode.addListener(() {
      if (!_passFocusNode.hasFocus) {
        setState(() {
          _visitedPass = true;
          validatePass();
        });
      }
    });
  }

  @override
  void dispose() {
    _emailController.dispose();
    _emailFocusNode.dispose();

    _passController.dispose();
    _passFocusNode.dispose();
    super.dispose();
  }

  void validateEmail() {
    final email = _emailController.text;
    if (email.isEmpty) {
      _errorEmailText = "L'adresse email ne peut pas être vide";
    } else if (!email.contains('@') || !email.contains('.')) {
      _errorEmailText = "L'adresse email n'est pas valide.";
    } else {
      setState(() {
        _emailValid = true;
      });
      _errorEmailText = null;
    }
  }

  void validatePass() {
    final pass = _passController.text;
    if (pass.isEmpty) {
      _errorPassText = "Le mot de passe ne peut pas être vide";
    } else if (pass.length < 6) {
      _errorPassText = "Mot de pass trop court.";
    } else {
      setState(() {
        _passValid = true;
      });
      _errorPassText = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(
                builder: (context) => const WelcomeScreen(),
              ),
            );
          },
          icon: const Icon(Icons.chevron_left_outlined),
          iconSize: 40,
        ),
        title: const AnimationWidget(
          beginOffset: Offset(1, 0),
          child: Text(
            'CONNEXION',
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              // Image de fond
              AnimationWidget(
                delay: const Duration(milliseconds: 200),
                beginOffset: const Offset(0, -1),
                child: SizedBox(
                  height: size.height / 2.3,
                  child: Image.asset('assets/consult.png'),
                ),
              ),

              // Texte
              AnimationWidget(
                delay: const Duration(milliseconds: 300),
                child: Text(
                  "Veuillez vous connecter",
                  style: TextStyle(
                    color: Theme.of(context).colorScheme.primary,
                    fontSize: 25,
                    fontWeight: FontWeight.w300,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              const SizedBox(height: 10),

              // Adresse email
              Form(
                key: key,
                child: Column(
                  children: [
                    // Adresse email
                    AnimationWidget(
                      delay: const Duration(milliseconds: 400),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: InputTextWidget(
                          labelText: 'Adresse email',
                          hintText: 'Ex : email@gmail.com',
                          errorText: _visitedEmail ? _errorEmailText : null,
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

                    // Mot de passe
                    AnimationWidget(
                      delay: const Duration(milliseconds: 500),
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: InputTextWidget(
                          labelText: 'Mot de passe',
                          hintText: 'Entrez votre mot de passe',
                          errorText: _visitedPass ? _errorPassText : null,
                          controller: _passController,
                          obscureText: _obscureText,
                          keyboardType: TextInputType.text,
                          focusNode: _passFocusNode,
                          prefixIcon: Icons.password_outlined,
                          validator: (value) {
                            if (value == null || value.isEmpty) {
                              setState(() {
                                _visitedPass = true;
                                _passValid = false;
                              });
                              return "Veuiller entrer votre mot de passe";
                            } else if (value.length < 6) {
                              setState(() {
                                _visitedPass = true;
                                _passValid = false;
                              });
                              return "Le mot de passe doit être supérieure à 5 caractères";
                            }
                            setState(() {
                              _passValid = true;
                            });
                            return null; // Retourne null si tout est correct
                          },
                          suffixIcon: IconButton(
                            icon: Icon(
                              _obscureText
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Theme.of(context).colorScheme.tertiary,
                            ),
                            onPressed: () {
                              setState(() {
                                _obscureText = !_obscureText;
                              });
                            },
                          ),
                        ),
                      ),
                    ),

                    // Mot de passe oublier
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(right: 10),
                          child: AnimationWidget(
                            beginOffset: const Offset(-1, 0),
                            delay: const Duration(milliseconds: 600),
                            child: TextButton(
                              onPressed: () {
                                Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (context) => const ForgotPass(),
                                  ),
                                );
                              },
                              child: const Text(
                                'Mot de passe oublier ?',
                                style: TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 18,
                                  color: Colors.cyan,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 10),

                    // Boutton connexion
                    AnimationWidget(
                      delay: const Duration(milliseconds: 700),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 18.0),
                        child: BouttonWidget(
                          text: 'CONNEXION',
                          onPressed: () {
                            if (key.currentState!.validate()) {
                              // Si la validation passe, afficher les valeurs
                              print('Adresse email : ${_emailController.text}');
                              print('Mot de passe : ${_passController.text}');
                            } else {
                              // Si la validation échoue, afficher un message d'erreur
                              print('Validation échouée');
                            }
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),

              // Texte inscription
              AnimationWidget(
                delay: const Duration(milliseconds: 800),
                beginOffset: const Offset(-1, 0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Vous n'avez pas un compte ?",
                      style: TextStyle(fontSize: 15),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RegisterScreen(),
                          ),
                        );
                      },
                      child: const Text(
                        'Inscription',
                        style: TextStyle(
                          fontSize: 25,
                          color: Colors.cyan,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
