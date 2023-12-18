{ config, inputs, pkgs, ... }: {
	imports = [
		inputs.ags.homeManagerModules.default
	];

	home.packages = with pkgs; [
		nodejs
		nodePackages.npm
		gthumb
		tofi

		# File browser
		gnome.nautilus

		# Communication
		discord
		swww

		# ags
		sassc
	];

	programs = {
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
