[[ -s "$HOME/.profile" ]] && source "$HOME/.profile"
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

export GOPATH="$HOME/go"
export GOBIN="$GOPATH/bin"

export PATH=$PATH:"$GOBIN:$HOME/.rvm/bin:/usr/local/bin:/usr/local/sbin:/usr/bin:/bin:/usr/sbin:/sbin"

autoload -U promptinit && promptinit
prompt pure

alias gd="git diff"
alias "git?"="git status -s"
alias "g?"="git?"
alias grm="git rm"
alias gbv="git branch -v"
alias gcp="git cherry-pick"
alias ggpullur="git pull --rebase upstream master"
alias git-delete-merged="git branch --merged | grep -v \"\*\" | grep -v master | grep -v dev | xargs -n 1 git branch -d"
alias git-kick='git commit --amend --no-edit && git push -f'

alias docker-up='eval $(docker-machine env)'
alias docker-kill-latest='docker kill $(docker ps -l -q)'
alias docker-test='docker-compose build test && docker-compose run --rm test'
alias dct='docker-test'

alias c="clear"
alias lt="ls -t -r"

alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
alias .....="cd ../../../.."

bu () { cp $1 ~/.backup/`basename $1`-`date +%Y%m%d%H%M`.backup ; }
mkdircd () { mkdir -p "$@" && eval cd "\"\$$#\""; }

alias update-old-npm-module="git mv LICENSE.md license && git mv README.md readme.md && npm uninstall --save-dev mocha && npm i --save-dev ava && git mv test/test.js test.js"

alias slp='pmset sleepnow'
alias stayup='caffeinate -u -t 3600'

function nt {
  if [ -z "$1" ]; then
    lt ~/nt
  else
    vim $(take_file ~/nt/"$1")
  fi
}

pngo () { imagemin -p pngquant $1 > "$1-o" && mv "$1-o" $1 }

# Take a text file and build it with an extension, if needed.
# Prefer gpg extension over txt.
# http://pig-monkey.com/2012/12/notes-unix/
take_file() {
  # If an extension was given, use it.
  if [[ "$1" == *.* ]]; then
    echo "$1"
  else
    # ... try the file without any extension.
    if [ -e "$1" ]; then
      echo "$1"
    # ... try the file with a gpg extension.
    elif [ -e "$1".gpg ]; then
      echo "$1".gpg
    # ... use a txt extension.
    else
      echo "$1".txt
    fi
  fi
}

# https://github.com/sindresorhus/pure
autoload -U promptinit; promptinit
prompt pure

. ~/.z.sh
