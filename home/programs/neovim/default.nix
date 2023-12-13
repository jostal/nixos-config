{ pkgs, ... }: {
	home.file.".config/nvim" = {
		source = ./nvimConf;
		recursive = true;
	};
}
