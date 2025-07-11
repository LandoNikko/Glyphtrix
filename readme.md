[![License][license-shield]][license-url]   [![GitHub][github-shield]][github-url]   [![Email][gmail-shield]][gmail-url]   ![Discord: landomrandom Status][discord-shield-static]

[license-shield]: https://img.shields.io/badge/License-GPL%20v2-031203?style=for-the-badge&labelColor=0b0b0b&logo=gnu&logoColor=00FF00
[license-url]: [LICENSE](https://github.com/LandoNikko/Glyphtrix/blob/main/LICENSE)

[github-shield]: https://img.shields.io/badge/GitHub-031203?style=for-the-badge&color=0b0b0b&logo=github&logoColor=00FF00
[github-url]: [URL](https://github.com/LandoNikko/Glyphtrix)

[gmail-shield]: https://img.shields.io/badge/Email-031203?style=for-the-badge&color=0b0b0b&logo=gmail&logoColor=00FF00
[gmail-url]: landonikko@gmail.com

[discord-shield-static]: https://img.shields.io/badge/Discord-landomrandom-031203?style=for-the-badge&labelColor=0b0b0b&messageColor=e0e6f7&logo=discord&logoColor=00FF00

# Glyphtrix

Glyphtrix is a local web app that transforms images and videos into real-time, character-based visual art in your browser.

Try it here: https://landonikko.github.io/Glyphtrix

![Glyphtrix_Home](https://github.com/user-attachments/assets/4b72104b-ada1-49be-8d08-d4b9511bb2ce)

## ![Features Shield][features-shield]

-   Supports image and video files.
-   Real-time processing.
-   Image adjustments with live preview to fine-tune output visualization.
-   Multiple output character style: Binary, languages, and Custom user-defined sequences.
-   Customizable output with character density, different fonts, output scale and color schemes.
-   Output downloadable as .png, .txt or .zip package for videos (.png image sequence).

[features-shield]: https://img.shields.io/badge/Features-00FF00?style=for-the-badge&color=0b0b0b&labelColor=0b0b0b

## ![Examples][examples-shield]

| Input Image | Output: Binary |
| :------------: | :---------------: |
| ![Input Image](https://github.com/user-attachments/assets/6cd90c8b-d13b-41bd-a332-e73e5bd0fd24) | ![VisuType_Binary](https://github.com/user-attachments/assets/f96016f4-b1ee-4a04-a27e-78c2bfa431e2) |
| Output: Chinese Characters | Output: Custom with Unicode Character |
| ![VisuType_Chinese](https://github.com/user-attachments/assets/562fe261-7747-4de0-9786-d27ae357464a) | ![VisuType_Custom](https://github.com/user-attachments/assets/3b255674-ccf0-4f4e-b30c-9f6926190b7b) |


[examples-shield]: https://img.shields.io/badge/Examples-00FF00?style=for-the-badge&color=0b0b0b&labelColor=0b0b0b

## ![Privacy & Processing Shield][processing-shield]

- No cloud processing or installations.
- 100% client-side: built with HTML, CSS and JavaScript.
- Images are stored temporarily in your browser as blobs.

[processing-shield]: https://img.shields.io/badge/Privacy%20&%20Processing-00FF00?style=for-the-badge&color=0b0b0b&labelColor=0b0b0b

## ![How it Works Shield][how-it-works-shield]

Glyphtrix analyzes the input image or video frame by frame. It applies selected pre-processing effects (like blur, brightness, levels), then divides the (potentially modified) visual into a grid based on the "Density" setting. The average brightness of each grid cell is mapped to a character from the chosen "Character Set." Finally, these characters are rendered onto an output canvas using the selected "Font Family," "Scale Factor," and "Color Scheme."

[how-it-works-shield]: https://img.shields.io/badge/How%20it%20Works-00FF00?style=for-the-badge&color=0b0b0b&labelColor=00FF00

## ![Feedback & Contributions Shield][feedback-shield]   [![License][license-shield]][license-url]

Contributions, bug reports and suggestions are welcome!

[![Email][gmail-shield]][gmail-url]   ![Discord: landomrandom Status][discord-shield-static]

[feedback-shield]: https://img.shields.io/badge/Feedback%20&%20Contribute-031203?style=for-the-badge&color=0b0b0b&logo=github&logoColor=e0e6f7