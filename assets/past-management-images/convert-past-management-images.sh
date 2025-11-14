mkdir -p optimised
for file in original/*; do
    echo $file
    base_name=$(basename $file)
    convert ${file} -resize "200x200^>" -gravity center -crop 200x200+0+0 -quality 89 optimised/${base_name}
done
