//hello from gp.js

$Traliva.$debug = {
	$state: true,
	//$url: 'qwe.rty'
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
        $aa:{
            $constructor: $TralivaKit.$ScreenKeyboard,
            $options:{
            },
            $substate: '$kb'
        }
		/*$aa:{
			$constructor: $TralivaKit.$Button,
			$options:{
				$title: 'Моя красивая кнопка'
			}
		}*/
		/*$aa:{
			$constructor: $TralivaKit.$Strip,
			$options:{
				$orient: #e#$TralivaKit__Strip__orient:v##
			},
			$children:{
				$items: {
					//'$1', '$2'
					$constructor: $TralivaKit.$Button,
					$options:{
						$size: '64px'
					},
					$itemOptions:{
						$title: 'xyz'
						//$titleVarName: 't'
					},
					$substate: '$books/$list'
				}
			}
		}*/
	},
	$states:{
		$initState:{
            //
            $kb:{
                $type: '$phone',
                //$type: '$classic',
                '$layout': '$ru'
            }
		}
	}
};
$Traliva.$init($o);

/*#MASK#boris$hello:a,b,v##
var a = #m#boris$hello:a,v##;
if (a & #m#boris$hello:a##)
	;
if (a & #m#boris$hello##)
	;*/

#u#qwe##
#USAGE_BEGIN#qwe##
#USAGE_BEGIN#qwe_debug##
//qwe debug
#USAGE_END#qwe_debug##
//qwe internals
#USAGE_END#qwe##
