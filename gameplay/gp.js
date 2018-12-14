//hello from gp.js

$Traliva.$debug = {
    $state: true
};
var $o = {
    $target: 'web',
    $get_layout:function($w, $h, $target){
        return '$lay_1';
    },
    $layouts:{
        $lay_1:{
            $type: $TralivaKit.$Strip,
            //$orient: #e#$TralivaKit__Strip__orient:h##,
            $orient: #e#$TralivaKit__Strip__orient:v##,
            $items:[
                '$dd',
                '$aa',
                {
                    $_widget: '$qwe',
                    $size: '32px'
                }
            ]
        }
    },
    $widgets:{
        /*$aa:{
            $constructor: $TralivaKit.$Button,
            $options:{
                $title: 'Моя красивая кнопка'
            }
        }*/
        $aa:{
            $constructor: $TralivaKit.$Strip,
            $options:{
                $orient: #e#$TralivaKit__Strip__orient:v##
            },
            $children:{
                $items: {
                    //'$1', '$2'
                    $constructor: $TralivaKit.$Button,
                    $options:{
                        $title: 'xyz'
                    },
                    $substate: '$books.$list'
                }
            }
        }
    },
    $states:{
        $initState:{
            $hello: '123e',
            $books:{
                $list:[
                    {
                    },
                    {
                    }
                ]
            }
        }
    }
};
$Traliva.$init($o);
