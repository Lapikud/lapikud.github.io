# Lapikute väliveeb

Tegu on [Jekyll](https://jekyllrb.com/) peale ehitatud uhiuue lehega

# Development plan

Materials are on `Google Drive > Lapikud > Tarkvara > Väliveeb`

# Contribution guide

## 1. Create Issues

Easiest way to help would be to create issues about things that are missing and wrong

## 2. Fork this repo and create a pull request

Fork this repo to your own account and create a pull request for changes you have done in there

# How to setup development environment

Windows:

0. Install the Windows Subsystem for Linux

    Install Ubuntu

    https://docs.microsoft.com/en-us/windows/wsl/install-win10

1. Install Ruby

        sudo apt install build-essential ruby ruby-dev dh-autoreconf

2. Install Jekyll

        sudo gem install jekyll

3. Clone repo

        git clone https://github.com/Lapikud/lapikud.github.io.git

4. Serve the page (Use bash if on Windows)

        cd lapikud.github.io
        jekyll serve --host 0.0.0.0

5. Image converter usage (requires imagemagick)

    No one wants to download 5MB images that are then shown in a 100x100px box.

    **Always resize images before committing them!**

        sudo apt-get install imagemagick
        sh convert-past-management-images.sh

MacOS:

0. Install Homebrew if you don't have it already

    If you're using Bash, write `/bin/bash` instead of `/bin/zsh`.

        /bin/zsh -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

1. Install the latest stable version of Ruby

        brew install ruby

    Also configure your shell environment.
    If you're using Bash, replace `.zshrc` with `.bash_profile`.
    
        if [ -d "/usr/local/opt/ruby/bin" ]; then
            export PATH=/usr/local/opt/ruby/bin:$PATH
            export PATH=`gem environment gemdir`/bin:$PATH
        fi

    Check that Ruby is working.

        ruby -v

2. Install the latest Jekyll gem

        sudo gem install jekyll

3. Clone repo

        git clone https://github.com/Lapikud/lapikud.github.io.git

4. Serve the page

        cd lapikud.github.io
        jekyll serve --host 0.0.0.0

5. Image converter usage (requires imagemagick)

    No one wants to download 5MB images that are then shown in a 100x100px box.
    
    **Always resize images before committing them!**
    
        sudo apt-get install imagemagick
        sh convert-past-management-images.sh

# Deploy

Push to master branch and wait for deployment, it could take up to 2h for the page to update.
You can check the progress by clicking on the [environment](https://github.com/Lapikud/lapikud.github.io/deployments) link

![Deployments link](https://i.imgur.com/26jnh6k.png)
