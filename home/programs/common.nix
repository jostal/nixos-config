{ pkgs, ... }: {
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
	];

	programs = {
		firefox = {
			enable = true;
		};
	};
}
