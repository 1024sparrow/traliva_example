#!/bin/bash
# Скрипт, производящий настройку текущей директории для разработки приложений на основе фрэймворка Тралива (traliva.ru)
####################################

DJANGO_VERSION=1.11

echo -n "Введите название вашего проекта (лат.): "
read PROJ_NAME

function title {
    echo -e "\n\033[1;33m-- $1 --\033[0m"
}

DEPEND="compile git python pip sed virtualenv"
function show_dependencies {
    echo Для установки необходимо наличие в системе следующих утилит:
    for i in $DEPEND
    do
        echo - $i
    done
}
function depend_error {
    echo "В системе не найдена утилита $1"
    show_dependencies
    exit 1
}

for i in $DEPEND
do
    which $i > /dev/null 2> /dev/null || depend_error $i
done

# Проверяем доступность интернета
#wget -q --tries=10 --timeout=2000 --spider http://google.com
wget http://traliva.ru -O test_internet
if [[ ! $? -eq 0 ]]; then
    echo Для работы скрипта необходим доступ в интернет
    exit 1
fi
rm test_internet

title "Выкачиваю фрэймворк Тралива"
git clone https://github.com/1024sparrow/traliva.git

title "Выкачиваю документацию в фрэймворку Тралива"
git clone https://github.com/1024sparrow/traliva_doc.git

#git clone https://github.com/1024sparrow/traliva_kit.git

title "Создаю локальный репозиторий для спецификации вашего проекта"
mkdir ${PROJ_NAME}_doc
cd ${PROJ_NAME}_doc
git init
cp "../$(dirname $0)/htmlgen.sh" ./
git add htmlgen.sh
git commit -m"First commit"
cd ..

title "Создаю локальный репозиторий для виджетов вашего проекта"
mkdir ${PROJ_NAME}_kit
cd ${PROJ_NAME}_kit
git init
git remote add parent_github https://github.com/1024sparrow/traliva_kit.git
git remote set-url parent_github --push "Вы не можете заливать изменения в репозиторий родительского проекта"
git pull parent_github master
compile src/traliva_kit.pro
cd ..

title "Создаю директорию ${PROJ_NAME}_proj, где у вас будет производиться бессерверная обкатка проекта"
mkdir ${PROJ_NAME}_proj
cd ${PROJ_NAME}_proj
ln -s ../traliva/compiled traliva
ln -s ../${PROJ_NAME}_kit/compiled ${PROJ_NAME}_kit
echo "<!DOCTYPE html>" > index.html
echo "<html>" >> index.html
echo "<head>" >> index.html
echo "<meta charset=\"utf-8\"/>" >> index.html
echo "<title>Проект $PROJ_NAME</title>" >> index.html
echo "<link href=\"traliva/_style/style.css\" rel=\"stylesheet\"/>" >> index.html
echo "<link href=\"${PROJ_NAME}_kit/traliva_kit.css\" rel=\"stylesheet\"/>" >> index.html
echo "<script src=\"traliva/traliva.js\"></script>" >> index.html
echo "<script src=\"${PROJ_NAME}_kit/traliva_kit.js\"></script>" >> index.html
echo "</head>" >> index.html
echo "<body>" >> index.html
echo "<script src=\"gameplay.js\"></script>" >> index.html
echo "</body>" >> index.html
echo "</html>" >> index.html

echo "Traliva.debug = {" > gameplay.js
echo "    state: true" >> gameplay.js
echo "};" >> gameplay.js
echo "Traliva.init({" >> gameplay.js
echo "    target: 'web'," >> gameplay.js
echo "    get_layout:function(w, h, target){" >> gameplay.js
echo "        return 'lay_1';" >> gameplay.js
echo "    }," >> gameplay.js
echo "    layouts:{" >> gameplay.js
echo "        lay_1:{" >> gameplay.js
echo "            type: 'strip'," >> gameplay.js
echo "            orient: 'v'," >> gameplay.js
echo "            items:['dd','aa']" >> gameplay.js
echo "        }" >> gameplay.js
echo "    }" >> gameplay.js
echo "});" >> gameplay.js
cd ..

title "Создаю директорию с веб-проектом"
django_variants=$(ls -1 $(dirname $0)/startcode/django)
echo "Доступные для реализации серверной части вашего проекта версии Django:"
for i in $django_variants
do 
    echo "$i ($(cat $(dirname $0)/startcode/django/$i/python_version))"
done
echo -n "Введите выбранную версию Django из списка: "
read DJANGO_VERSION
PYTHON_VERSION=$(cat $(dirname $0)/startcode/django/$DJANGO_VERSION/python_version)
PIP_VERSION=$(cat $(dirname $0)/startcode/django/$DJANGO_VERSION/pip_version)

mkdir ${PROJ_NAME}_proj_web
cd ${PROJ_NAME}_proj_web
virtualenv venv_django_${DJANGO_VERSION} -p $(which $PYTHON_VERSION)
source venv_django_${DJANGO_VERSION}/bin/activate
$PIP_VERSION install Django==${DJANGO_VERSION}
django-admin startproject project
cd project
python manage.py startapp api_app
echo "STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]" >> project/settings.py
echo "LOGIN_REDIRECT_URL = '/'" >> project/settings.py
echo "LOGIN_URL = '/accounts/login/'" >> project/settings.py
echo "LOGOUT_REDIRECT_URL = '/' #since Django version 1.10" >> project/settings.py
sed "s/'DIRS': \[\],/'DIRS': \[os.path.join(BASE_DIR, 'templates')\],/g" project/settings.py > project/settings.py_
mv project/settings.py_ project/settings.py
mkdir -p static/api templates/api templates/project
ln -s "../../../../${PROJ_NAME}_proj/index.html" templates/project/index.html
ln -s "../../../${PROJ_NAME}_proj" static/project
echo "# documentation available at https://docs.djangoproject.com/en/"$(django-admin --version)"/topics/http/urls/" > project/urls.py
echo >> project/urls.py
echo "from django.conf.urls import url, include" >> project/urls.py
echo "from django.contrib import admin" >> project/urls.py
echo "from django.shortcuts import render" >> project/urls.py
echo >> project/urls.py
echo "def view_html(request):" >> project/urls.py
echo "    return render(request, 'project/index.html')" >> project/urls.py
echo >> project/urls.py
echo "urlpatterns = [" >> project/urls.py
echo "    url(r'^admin/', admin.site.urls)," >> project/urls.py
echo "    url(r'^api/', include('api_app.urls'))," >> project/urls.py
echo "    url(r'', view_html)" >> project/urls.py
echo "]" >> project/urls.py

echo "# documentation available at https://docs.djangoproject.com/en/"$(django-admin --version)"/topics/http/urls/" > api_app/urls.py
echo >> api_app/urls.py
echo "from django.conf.urls import url" >> api_app/urls.py
echo >> api_app/urls.py
echo "urlpatterns = [" >> api_app/urls.py
echo "]" >> api_app/urls.py

deactivate

