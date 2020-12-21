window.onload = function(){
    'use strict';

    let scene;
    let camera;
    let renderer;
    let ambientLight;
    let directionLight;
    let objmodel;
    const makeroom = document
    
    init();
    animate();
    
    function init(){
        /* scene(シーン)の作成 */
        scene = new THREE.Scene();

        /* camera(カメラ)の作成 */
        camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 1000 );

        /* renderer(レンダラー)の作成　*/
        renderer = new THREE.WebGLRenderer({alpha:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("BG").appendChild( renderer.domElement );
        renderer.render(scene, camera);

        /* Light(ライト)の設定 */

        // THREE.AmbientLight ： 環境光・・・オブジェクトの全ての面を均等に照らすライト。影が出来ない。
        // new THREE.AmbientLight(光の色,光の強さ[省略可])
        //ambientLight = new THREE.AmbientLight( 0xcccccc, 2 );
        //scene.add( ambientLight );

        // THREE.DirectionalLight ： 平行光源・・・特定の方向へのライト。影が出来る。
        // new THREE.DirectionalLight(光の色,光の強さ[省略可])
        directionLight = new THREE.DirectionalLight( 0xffffff, 2 );
        // DirectionalLightの位置
        directionLight.position.set( 10, 10, 10);
        //ライトで影表示させる設定
        directionLight.castShadow = true;
        // DirectionalLightの対象オブジェクト
        //directionLight.target = objmodel;
        scene.add( directionLight );


        /* camera(カメラ)の位置設定　*/
        camera.position.z = 20;

        /* MTLファイルとObjファイルの読み込み */           
        new THREE.MTLLoader().setPath('../assets/').load('Basehead.mtl',function(materials){
            materials.preload();
            new THREE.OBJLoader().setPath('../assets/')
                                .setMaterials(materials)
                                .load('Basehead.obj',function (object){
                objmodel = object.clone();
                // 位置の初期化
                objmodel.position.set(0, 2, -5);

                objmodel.scale.set(4, 4, 4);
                //モデルに影表示させる設定
                objmodel.castShadow = true;

                scene.add(objmodel);
            }); 
        });

    }

    /* 繰り返しの処理　*/
    function animate() {
        requestAnimationFrame( animate );
        render();
    };
    function render() {
        // y軸方向に回転
        while(true){
            objmodel.rotation.y -= 0.01;
            // 再描画
            renderer.render(scene, camera); 
        }
    };
};

