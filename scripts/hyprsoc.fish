#!/etc/profiles/per-user/jostal/bin/fish

function handle
  # read -d ">>" -l event data
  # echo $event
  # echo $data

  echo $argv

  # if $event
end


socat - UNIX-CONNECT:/tmp/hypr/$HYPRLAND_INSTANCE_SIGNATURE/.socket2.sock | while read -r line; handle "$line"; end
