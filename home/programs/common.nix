{ inputs, pkgs, ... }: {
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

		ags = {
			enable = true;
			# configDir = ./configs/ags;
		};
	};
}
