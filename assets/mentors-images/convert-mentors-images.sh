mkdir -p optimised
for file in original/*; do
    echo $file
    base_name=$(basename $file)
    if [[ $base_name == *"airiin"* ]] || [[ $base_name == *"lembitu"* ]] ; then
        gravity=north
    else
        gravity=center
    fi    
    convert ${file} -resize "300x300^>" -gravity $gravity -extent 300x300  optimised/${base_name%}
done
