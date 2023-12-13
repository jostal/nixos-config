{ config, pkgs, ... }: {
	imports = [
		./hyprland
		./programs	
		./theme
	];

	home = {
		username = "jostal";
		homeDirectory = "/home/jostal";

		stateVersion = "23.11";
	};

	programs.home-manager.enable = true;
}
