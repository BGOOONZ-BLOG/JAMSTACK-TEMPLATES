# dotfiles

This is where my dotfiles live.

## Installation

```sh
git clone https://github.com/johnotander/dotfiles && cd $_
source bootstrap.sh
```

## New machine setup

This happens rarely enough to where I don't think it needs to be automated.
But, these are the steps I take.

- Switch to zsh: `chsh -s $(which zsh)`
- Set dock to small
- Swap Caps Lock => Escape
- Download Chrome
- Download 1password
- Download [hyper][]
- Install homebrew
- [Cache][cache] git credentials
  - `git config --global user.name "John Otander"`
  - `git config --global user.email "johnotander@gmail.com"`
  - Get personal access token from GitHub for auth under "Developer Settings"
- Setup ssh key
  - `ssh-keygen -t rsa -b 4096 -C "johnotander@gmail.com"`
- `git clone https://github.com/johno/dotfiles && cd $_ && bootstrap && cd`
- Install [pathogen][]
- Install homebrew packages
  - Rbenv
  - Node
- Install golang
  - `mkdir $HOME/Go`
  - `mkdir -p $HOME/Go/src/github.com/johno`
  - `brew install go` 

## License

MIT

[hyper]: https://hyper.is/
[cache]: https://help.github.com/articles/caching-your-github-password-in-git/
[pathogen]: https://github.com/tpope/vim-pathogen
