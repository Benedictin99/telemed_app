import 'dart:async';

import 'package:flutter/material.dart';
import 'package:telemed_app/screens/WelcomeScreen.dart';
import 'package:telemed_app/widget/AnimationWidget.dart';
import 'package:telemed_app/utils/theme.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const WelcomeScreen(),
      themeMode: ThemeMode.system,
      theme: MyThemes.lightTheme,
      darkTheme: MyThemes.darkTheme,
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  double _progress = 0.0;
  String _percentage = '0%';

  @override
  void initState() {
    super.initState();
    // _startProgress();
  }

  //Démarre la barre de progression
  void _startProgress() {
    Timer.periodic(const Duration(milliseconds: 100), (timer) {
      if (_progress < 1.0) {
        setState(() {
          _progress += 0.02;
          _percentage = '${(_progress * 100).toStringAsFixed(0)}%';
        });
      } else {
        timer.cancel();
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const WelcomeScreen()),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Padding(
              padding: EdgeInsets.only(
                top: 50.0,
                left: 20,
                right: 20,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  AnimationWidget(
                    delay: Duration(milliseconds: 100),
                    child: Text(
                      'TELEMEDECINE',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 35,
                      ),
                    ),
                  ),
                  SizedBox(height: 20),
                  AnimationWidget(
                    delay: Duration(milliseconds: 200),
                    child: Text(
                      'Bienvenu sur l\'application \n de suivi médicale en ligne gratuit à Madagascar',
                      style: TextStyle(
                        fontSize: 25,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ],
              ),
            ),
            AnimationWidget(
              delay: const Duration(milliseconds: 300),
              child: Image.asset(
                'assets/telemedecine.png',
                fit: BoxFit.cover,
              ),
            ),

            // Barre de progression en bas
            Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 80.0,
                vertical: 20.0,
              ),
              child: Column(
                children: [
                  LinearProgressIndicator(
                    value: _progress,
                    minHeight: 20,
                    borderRadius: BorderRadius.circular(10),
                    backgroundColor: Colors.grey[300],
                    valueColor: const AlwaysStoppedAnimation<Color>(
                      Colors.cyan,
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Pourcentage
                  Text(
                    _percentage,
                    style: const TextStyle(
                      fontSize: 23,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
