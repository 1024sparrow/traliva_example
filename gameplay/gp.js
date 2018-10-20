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
            $bg: '#000',
            $type: '$strip',
            $orient: 'v',
            $items:[
                {
                    $widget:{
                        $type: '$strip',
                        $orient: 'h',
                        $items: ['$bnBooks', '$bnMusic']
                    },
                    $size: '64px'
                },
                '$scene'
            ]
        },
    },
    $widgets:{
        $bnBooks: {
            $constructor: $TralivaKit.$Button,
            $options:{
                $title: 'Книги',
                $activeVarName: '$bnModeBooks',
                $color: '#ffa',
                $hover_color: '#004',
                $active_bgColor: '',
                $border:{$radius: '10px'}
            },
            $substate: '$gui'
        },
        $bnMusic: {
            $constructor: $TralivaKit.$Button,
            $options:{
                $title: 'Музыка',
                $activeVarName: '$bnModeMusic',
                $color: '#ffa',
                $hover_color: '#004',
                $border:{$radius: '10px'}
            },
            $substate: '$gui'
        }
    },
    $states:{
        $initState:{
            $gui:{
                $bnModeBooks: true,
                $bnModeMusic: false
            }
        }
    }
};
$Traliva.$init($o);
