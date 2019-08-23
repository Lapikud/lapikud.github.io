# Lapikute väliveeb

Tegu on [Jekyll](https://jekyllrb.com/) peale ehitatud uhiuue lehega

# Development plan

Materials are on `Google Drive > Lapikud > Tarkvara > Väliveeb`

# Contribution guide

## 1. Create Issues

Easiest way to help would be to create issuses about things that are missing and wrong

## 2. Fork this repo and create a pull request

Fork this repo to your own account and create a pull request for changes you have done in there

# How to setup devenvironment

0. (Windows) Install the Windows Subsystem for Linux

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

        sudo apt-get install imagemagick
        sh convert-past-management-images.sh

# Deploy (TODO)

        jekyll build
        rsync -av _site/. TODO FIXME
