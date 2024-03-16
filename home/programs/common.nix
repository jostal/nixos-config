{ config, inputs, pkgs, ... }: {
	imports = [
		inputs.ags.homeManagerModules.default
	];

	home.packages = with pkgs; [
		nodejs
		nodePackages.npm
		gthumb
		tofi
    python3

		# File browser
		gnome.nautilus

		# Communication
		discord
		swww

		# ags
		sassc

    # Media
    (mpv.override { scripts = [mpvScripts.mpris]; })
    spotify
    grimblast
    gimp-with-plugins

    # Notes
    logseq

    # Cloud
    dropbox

    # Emulation
    renode

    # firmware dev
    pulseview
    sigrok-cli
    sigrok-firmware-fx2lafw
    gtkwave
    libsigrok
    arduino
    ghdl
    kicad
	];
  
	programs = {

    vscode = {
      enable = true;
      package = pkgs.vscode.fhs;
    };

		firefox = {
			enable = true;
		};

    keychain = {
      enable = true;
      enableFishIntegration = true;
      keys = [
        "id_ed25519"
      ];
    };

		ags = {
			enable = true;
      configDir = config.lib.file.mkOutOfStoreSymlink "/home/jostal/nixos-config/home/programs/configs/ags";
		};
	};
}
