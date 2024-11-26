import 'package:flutter/material.dart';

class MyThemes {
  static final darkTheme = ThemeData(
    brightness: Brightness.dark,
    colorScheme: ColorScheme.dark(
      primary: Colors.white70,
      secondary: Colors.amberAccent,
      tertiary: Colors.grey.shade400,
      outline: Colors.white,
    ),
  );

  static final lightTheme = ThemeData(
    brightness: Brightness.light,
    colorScheme: const ColorScheme.light(
      primary: Colors.black54,
      secondary: Colors.amber,
      tertiary: Colors.grey,
      outline: Colors.black,
    ),
  );
}
