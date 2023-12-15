{ config, pkgs, ... }:
let
	font = "JetBrainsMono Nerd Font Mono";
in
{
	programs.alacritty = {
		enable = true;
		settings = {
			env = {
				COLORTERM = "truecolor";
			};

			window = {
				opacity = 0.75;
				blur = true;

				padding = {
					x = 5;
					y = 0;
				};
			};

			cursor.style.shape = "Beam";

			font = {
				size = 12.0;
				bold = {
					family = "JetBrainsMono Nerd Font";
					style = "Bold";
				};
				italic = {
					family = "JetBrainMono Nerd Font";
					style = "Italic";
				};
				normal = {
					family = "JetBrainsMono Nerd Font";
					style = "Regular";
				};
			};

			colors = {
				bright = {
					black = "#3c3836";
					red = "#ea6962";
					green = "#a9b665";
					yellow = "#d8a657";
					blue = "#7daea3";
					magenta = "#d3869b";
					cyan = "#89b482";
					white = "#d4be98";
				};
				normal = {
					black = "#3c3836";
					red = "#ea6962";
					green = "#a9b665";
					yellow = "#d8a657";
					blue = "#7daea3";
					magenta = "#d3869b";
					cyan = "#89b482";
					white = "#d4be98";
				};
				primary = {
					background = "#282828";
					foreground = "#d4be98";
				};
			};
		};
	};
}
