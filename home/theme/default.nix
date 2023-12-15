{ pkgs, ... }:
let
	nerdfonts = (pkgs.nerdfonts.override { fonts = [
    "JetBrainsMono"
	]; });
	
	cursor-theme = "Numix-Cursor";
	cursor-package = pkgs.numix-cursor-theme;
in {
	home = {
		packages = with pkgs; [
			volantes-cursors
			fira
			nerdfonts
			# catppuccin-gtk
		];
		sessionVariables.XCURSOR_THEME = cursor-theme;
		pointerCursor = {
			package = cursor-package;
			name = cursor-theme;
			size = 24;
			gtk.enable = true;
			x11.enable = true;
		};

    fonts.fontconfig.enable = true;

		file = {
			".local/share/fonts" = {
				recursive = true;
				source = "${nerdfonts}/share/fonts/truetype/NerdFonts";
			};
			".fonts" = {
				recursive= true;
				source = "${nerdfonts}/share/fonts/truetype/NerdFonts";
			};
			# ICONS HERE
		};
	};

	dconf.settings = {
		"org/gnome/desktop/interface" = {
			gtk-theme = "Gruvbox-Dark-BL";
		};
	};

	gtk = {
		enable = true;
		font.name = "Fira";

		cursorTheme = {
			name = cursor-theme;
			package = cursor-package;
		};

		theme = {
			name = "Gruvbox-Dark-BL";
			# package = pkgs.gruvbox-gtk-theme;
		};

		iconTheme = {
			name = "Papirus-Dark";
			package = pkgs.papirus-icon-theme;
		};

		gtk4.extraConfig = {
			gtk-theme-name = "Gruvbox-Dark-BL";
		};
	};

	home.sessionVariables.GTK_THEME = "Gruvbox-Dark-BL";

	qt = {
		enable = true;
		platformTheme = "gtk";
		# style.name = "";
	};

}
