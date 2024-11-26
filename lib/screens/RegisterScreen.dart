import 'package:flutter/material.dart';
import 'package:telemed_app/widget/AnimationWidget.dart';
import 'package:telemed_app/widget/BouttonWidget.dart';
import 'package:telemed_app/widget/InputTextWidget.dart';
import 'package:telemed_app/screens/WelcomeScreen.dart';
import 'package:telemed_app/screens/LoginScreen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final key = GlobalKey<FormState>();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passController = TextEditingController();
  final TextEditingController _repassController = TextEditingController();

  final FocusNode _emailFocusNode = FocusNode();
  final FocusNode _passFocusNode = FocusNode();
  final FocusNode _repassFocusNode = FocusNode();

  bool _emailValid = false;
  bool _passValid = false;
  bool _repassValid = false;

  bool _obscureText = true;
  bool _reobscureText = true;

  bool _visitedEmail = false;
  bool _visitedPass = false;
  bool _visitedRePass = false;

  bool _isChecked1 = false;
  bool _isChecked2 = false;

  String? _errorEmailText;
  String? _errorPassText;
  String? _errorRePassText;

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

    _repassFocusNode.addListener(() {
      if (!_repassFocusNode.hasFocus) {
        setState(() {
          _visitedRePass = true;
          validateRePass();
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

    _repassController.dispose();
    _repassFocusNode.dispose();
    super.dispose();
  }

  void validateEmail() {
    final email = _emailController.text;
    if (email.isEmpty) {
      _errorEmailText = "Veuiller entrer votre adresse email";
    } else if (!email.contains('@') || !email.contains('.')) {
      _errorEmailText = "L'adresse email n'est pas valide.";
    } else {
      setState(() {
        _emailValid = true;
      });
      _errorEmailText = null;
    }
    setState(() {});
  }

  void validatePass() {
    final pass = _passController.text;
    if (pass.isEmpty) {
      _errorPassText = "Le mot de passe ne peut pas être vide";
    } else if (pass.length < 6) {
      _errorPassText = "Le mot de passe doit être supérieure à 5 caractères";
    } else {
      setState(() {
        _passValid = true;
      });
      _errorPassText = null;
    }
    setState(() {});
  }

  void validateRePass() {
    final pass = _passController.text;
    final repass = _repassController.text;

    if (repass.isEmpty) {
      _errorRePassText = "Repeter votre mot de passe";
    } else if (repass != pass) {
      _errorRePassText = "Les deux mots de passe doit être identiques";
    } else {
      setState(() {
        _repassValid = true;
      });
      _errorRePassText = null;
    }
    setState(() {});
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
            'INSCRIPTION',
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
          padding: const EdgeInsets.symmetric(horizontal: 10.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              // Image de fond
              AnimationWidget(
                delay: const Duration(milliseconds: 200),
                beginOffset: const Offset(0, 1),
                child: SizedBox(
                  height: size.height / 2.5,
                  child: Image.asset('assets/doctoradd.png'),
                ),
              ),
              const SizedBox(height: 10),

              // Adresse email
              Form(
                key: key,
                child: Column(
                  children: [
                    AnimationWidget(
                      delay: const Duration(milliseconds: 300),
                      child: InputTextWidget(
                        labelText: 'Adresse email',
                        hintText: 'Ex : email@gmail.com',
                        errorText: _visitedEmail ? _errorEmailText : null,
                        controller: _emailController,
                        focusNode: _emailFocusNode,
                        keyboardType: TextInputType.emailAddress,
                        prefixIcon: Icons.email_outlined,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            setState(() {
                              _visitedEmail = true;
                              _emailValid = false;
                            });
                            return "L'adresse email ne peut pas être vide";
                          } else if (!value.contains('@') ||
                              !value.contains('.')) {
                            setState(() {
                              _visitedEmail = true;
                              _emailValid = false;
                            });
                            return "L'adresse email n'est pas valide.";
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
                    const SizedBox(height: 10),
                    AnimationWidget(
                      delay: const Duration(milliseconds: 400),
                      child: InputTextWidget(
                        labelText: 'Mot de passe',
                        hintText: 'Minimum 8 caractères',
                        errorText: _visitedPass ? _errorPassText : null,
                        controller: _passController,
                        obscureText: _obscureText,
                        focusNode: _passFocusNode,
                        keyboardType: TextInputType.text,
                        prefixIcon: Icons.password_outlined,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            setState(() {
                              _visitedPass = true;
                              _passValid = false;
                            });
                            return "Le mot de passe ne peut pas être vide";
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
                    const SizedBox(height: 10),
                    AnimationWidget(
                      delay: const Duration(milliseconds: 500),
                      child: InputTextWidget(
                        labelText: 'Confirmation mot de passe',
                        hintText: 'Repeter votre mot de passe',
                        errorText: _visitedRePass ? _errorRePassText : null,
                        controller: _repassController,
                        obscureText: _reobscureText,
                        focusNode: _repassFocusNode,
                        keyboardType: TextInputType.text,
                        prefixIcon: Icons.password_outlined,
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            setState(() {
                              _visitedRePass = true;
                              _repassValid = false;
                            });
                            return "Ce champ est obligatoire";
                          } else if (value != _passController.text) {
                            setState(() {
                              _visitedRePass = true;
                              _repassValid = false;
                            });
                            return "Les deux mots de passe doit être identique";
                          }
                          setState(() {
                            _repassValid = true;
                          });
                          return null; // Retourne null si tout est correct
                        },
                        suffixIcon: IconButton(
                          icon: Icon(
                            _reobscureText
                                ? Icons.visibility
                                : Icons.visibility_off,
                            color: Theme.of(context).colorScheme.tertiary,
                          ),
                          onPressed: () {
                            setState(() {
                              _reobscureText = !_reobscureText;
                            });
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),

                    // Les cases à cocher
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        // Case à cocher pour docteur
                        AnimationWidget(
                          beginOffset: const Offset(-1, 0),
                          delay: const Duration(milliseconds: 600),
                          child: Row(
                            children: [
                              Checkbox(
                                value: _isChecked1,
                                onChanged: (bool? value) {
                                  setState(() {
                                    _isChecked1 = value!;
                                  });
                                  if (_isChecked1) {
                                    print("=>> Docteur cocher");
                                  } else {
                                    print("=>> Docteur decocher");
                                  }
                                },
                                checkColor:
                                    Theme.of(context).colorScheme.primary,
                                activeColor:
                                    Theme.of(context).colorScheme.secondary,
                                tristate: false,
                              ),
                              const Text("Docteur"),
                            ],
                          ),
                        ),
                        const SizedBox(width: 30),

                        // Case à cocher pour patient
                        AnimationWidget(
                          beginOffset: const Offset(1, 0),
                          delay: const Duration(milliseconds: 700),
                          child: Row(
                            children: [
                              Checkbox(
                                value: _isChecked2,
                                onChanged: (bool? value) {
                                  setState(() {
                                    _isChecked2 = value!;
                                  });
                                  if (_isChecked2) {
                                    print("=>> Patient cocher");
                                  } else {
                                    print("=>> Patient decocher");
                                  }
                                },
                                checkColor:
                                    Theme.of(context).colorScheme.primary,
                                activeColor:
                                    Theme.of(context).colorScheme.secondary,
                                tristate: false,
                              ),
                              const Text("Patient"),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),

                    // Boutton de connexion
                    AnimationWidget(
                      delay: const Duration(milliseconds: 800),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 50),
                        child: BouttonWidget(
                          text: 'INSCRIPTION',
                          onPressed: () {
                            if (key.currentState!.validate()) {
                              if (_isChecked1 && _isChecked2) {
                                print("Veuiller selectionner une seul case");
                              } else if (_isChecked1) {
                                print("Inscrit en tant que docteur");
                                print(
                                    'Adresse email : ${_emailController.text}');
                                print('Mot de passe : ${_passController.text}');
                              } else if (_isChecked2) {
                                print("Inscrit en tant que patient");
                                print(
                                    'Adresse email : ${_emailController.text}');
                                print('Mot de passe : ${_passController.text}');
                              } else {
                                print("Veuiller selectionner votre profession");
                              }
                            } else {
                              print('=> Inscription échouée');
                            }
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 10),
                  ],
                ),
              ),

              // Texte pas encore inscrit
              AnimationWidget(
                delay: const Duration(milliseconds: 900),
                beginOffset: const Offset(1, 0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      "Vous avez déjà un compte ?",
                      style: TextStyle(fontSize: 15),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const LoginScreen(),
                          ),
                        );
                      },
                      child: const Text(
                        'Connexion',
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
