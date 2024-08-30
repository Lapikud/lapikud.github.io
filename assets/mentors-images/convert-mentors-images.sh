mkdir -p optimised
for file in original/*; do
    echo $file
    base_name=$(basename $file)
    if [[ $base_name == *"airiin"* ]] || [[ $base_name == *"lembitu"* ]] ; then
        gravity=north
    else
        gravity=center
    fi    
    magick ${file} -resize "400x400^>" -gravity $gravity -extent 400x400  optimised/${base_name%}
done
