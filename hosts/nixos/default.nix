{ config, pkgs, ... }: {
	imports = [
		../../modules/system.nix
		../../modules/hyprland.nix

		../../hardware-configuration.nix
	];

  virtualisation.virtualbox.host.enable = true;
  virtualisation.virtualbox.host.enableExtensionPack = true;
  virtualisation.virtualbox.guest = {
    enable = true;
  };
  users.extraGroups.vboxusers.members = [ "jostal" ];

  # Hardware
  hardware = {
    bluetooth = {
      enable = true;
      powerOnBoot = true;
    };

    openrazer.enable = true;
    openrazer.users = [ "jostal" ];

    xpadneo.enable = true;
    xone.enable = true;
  };

	# Bootloader
	boot = {
		loader = {
			timeout = 8;
			efi = {
				canTouchEfiVariables = true;
				efiSysMountPoint = "/boot";
			};
			systemd-boot = {
				enable = true;
				configurationLimit = 10;
			};
		};

		initrd = {
			systemd.enable = true;
			luks.devices."luks-ee79b25d-3890-4cda-b776-51c752041db4" = {
				device = "/dev/disk/by-uuid/ee79b25d-3890-4cda-b776-51c752041db4";
				keyFile = null;
#				fallbackToPassword = true;
				keyFileTimeout = 2;
#				tryEmptyPassphrase = true;
#				allowDiscards = true;
			};
			
			kernelModules = [ "amdgpu" ];
		};

		extraModulePackages = [ config.boot.kernelPackages.rtl88x2bu ];
	};

	# Networking
	networking = {
		hostName = "nixos";
		networkmanager = {
			enable = true;
			wifi = {
				scanRandMacAddress = false;
			};
		};
	};

	system.stateVersion = "23.11";
}
