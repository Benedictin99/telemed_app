import 'package:flutter/material.dart';
import 'package:telemed_app/screens/RegisterScreen.dart';
import 'package:telemed_app/widget/AnimationWidget.dart';
import 'package:telemed_app/screens/LoginScreen.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});

  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      // appBar: AppBar(),
      body: SafeArea(
        child: Column(
          // mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const AnimationWidget(
              delay: Duration(milliseconds: 100),
              child: Padding(
                padding: EdgeInsets.only(top: 50.0),
                child: Text(
                  'Bienvenue',
                  style: TextStyle(
                    fontSize: 55,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Image de fond
            AnimationWidget(
              delay: const Duration(milliseconds: 200),
              child: SizedBox(
                width: size.width / 1.1,
                child: Image.asset('assets/callvideo.png'),
              ),
            ),
            const SizedBox(height: 20),

            // Les deux boutons
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 10,
                  ),
                  child: AnimationWidget(
                    beginOffset: const Offset(-1, 0),
                    delay: const Duration(milliseconds: 300),
                    child: MaterialButton(
                      minWidth: double.infinity,
                      height: size.height / 15,
                      color: Theme.of(context).colorScheme.secondary,
                      onPressed: () {
                        Navigator.of(context).pushReplacement(
                          MaterialPageRoute(
                            builder: (context) => const LoginScreen(),
                          ),
                        );
                      },
                      shape: RoundedRectangleBorder(
                        side: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(50),
                      ),
                      child: const Text(
                        'Connexion',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                ),

                // Boutton inscription
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 20,
                    vertical: 10,
                  ),
                  child: AnimationWidget(
                    beginOffset: const Offset(1, 0),
                    delay: const Duration(milliseconds: 300),
                    child: MaterialButton(
                      minWidth: double.infinity,
                      height: size.height / 15,
                      color: Theme.of(context).colorScheme.secondary,
                      onPressed: () {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RegisterScreen(),
                          ),
                        );
                      },
                      shape: RoundedRectangleBorder(
                        side: const BorderSide(color: Colors.black),
                        borderRadius: BorderRadius.circular(50),
                      ),
                      child: const Text(
                        'Inscription',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                          color: Colors.black,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
