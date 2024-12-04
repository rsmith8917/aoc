curl "https://adventofcode.com/2024/day/$1/input" --header "Cookie: session=$(cat .token)" > input

folder="day$(printf '%02d' $1)"

mkdir $folder
mv input $folder
touch "$folder/p1.ts"

