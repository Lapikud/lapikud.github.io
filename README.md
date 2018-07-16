# Lapikute väliveeb

Tegu on [Jekyll](https://jekyllrb.com/) peale ehitatud uhiuue lehega

# How to dev

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

# Deploy (TODO)

        jekyll build
        rsync -av _site/. TODO FIXME
