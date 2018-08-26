#!/usr/bin/env bash

mkdir -p optimised
for file in original-jpg-converted/*; do
    echo $file
    base_name=$(basename $file)
    convert ${file} -resize "1000x1000>" -quality 89 optimised/${base_name}
done
