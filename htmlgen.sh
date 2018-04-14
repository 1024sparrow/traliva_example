#!/bin/bash
# TODO:
#  - генерация "хлебных крошек"
#  - вычисление относительного пути по адресам, скопированным из адресной строки браузера

#function list {
#    for i in $(ls -1d *.html 2> /dev/null)
#    do
#        if [ ! -d $i ]
#        then
#            echo ${i/.html/}
#        fi
#    done
#}

function add {
    echo -n "Заголовок: "
    read title
    if [ -z "$title" ]; then title=TITLE; fi
    echo -n "Название файла: "
    read filename

    mkdir "$filename"
    ln -s "../$0" "$filename"/
    #echo $(dirname $0)
    echo '<html>' > "$filename/index.html"
    echo '<head>' >> "$filename/index.html"
    echo '<meta charset="utf-8"/>' >> "$filename/index.html"
    echo "<title>$title</title>" >> "$filename/index.html"
    echo '</head>' >> "$filename/index.html"
    echo '<body>' >> "$filename/index.html"
    if [ -f index.html ]
    then
        echo '<a href="../index.html" style="font-size=2em;color:#f60;border:1px solid #f60;border-radius:5px;">НАВЕРХ</a>' >> "$filename/index.html"
    fi
    echo '<p></p>' >> "$filename/index.html"
    echo '</body>' >> "$filename/index.html"
    echo '</html>' >> "$filename/index.html"

    echo "<a href=\"$filename/index.html\">ССЫЛКА</a>"
}

#function remove {
#    PS3='Какой документ удалить? '
#    select filename in $(list)
#    do
#        if [ -z $filename ]; then
#            exit 1
#        fi
#        rm -rf "$filename"
#        break
#    done
#}

case "$1" in
    help)
        echo not implemented
        ;;
    list)
        list;;
    add)
        add;;
    *)
        echo "incorrect parameter given. Usage: {help|add}" >&2
        exit 1
        ;;
esac
