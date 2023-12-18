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
        "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILsIP8OdPlIN6jIgO6QUlDNnl4kocc1SfwOOQLUE6nQK josephtalon01@gmail.com"
      ];
    };

		ags = {
			enable = true;
      configDir = config.lib.file.mkOutOfStoreSymlink "/home/jostal/nixos-config/home/programs/configs/ags";
			# configDir = ./configs/ags;
		};
	};
}
