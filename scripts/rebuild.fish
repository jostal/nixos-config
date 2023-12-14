#!/etc/profiles/per-user/jostal/bin/fish

function rebuild -d "Rebuild nixos"
  set -f rebuildAgs 0 # rebuild ags flag
  set -f commitMessage "Nixos rebuild"
  set -f testRebuild 0
  # set flags
  switch $argv[(count $argv)]
    case '-ags' # rebuild ags
      set -f rebuildAgs 1
    case '-test'
      set -f testRebuild 1
    case '-m' # commit message
      set -f commitMessage $argv[(count $argv)+1]
  end

  if test $rebuildAgs -eq 1
    ags -q
  end
  
  git add .
  and git commit -m $commitMessage

  if test $testRebuild -eq 1
    command sudo nixos-rebuild test
  else
    command sudo nixos-rebuild switch
  end

  # if test $rebuildAgs -eq 1
  #   if ags
  #     echo "Starting AGS"
  #   end
  # end
end

