var clownLimbR = 1.5;
var clownLimbH = 20;
var clownHeadR = 10;
var clownChestR = 15;
var clown = createClown(clownHeadR, clownChestR, clownLimbR, clownLimbH);

function createClown(headR, chestR, limbR, limbH) {
    var clown = new THREE.Object3D();
    var lowerBody = drawLowerBody(limbR, limbH, chestR);
    clown.add(lowerBody);
    var upperBody = new THREE.Object3D();
    var torso = drawTorso(chestR, limbR, limbH);
    var head = drawHead(headR);
    head.translateY(chestR + .8 * headR);
    upperBody.add(head);
    upperBody.add(torso);
    upperBody.translateY(limbH * .8 + chestR);
    clown.add(upperBody);
    var dot = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 8), new THREE.MeshBasicMaterial({
        color: THREE.ColorKeywords.yellow
    }));
    clown.add(dot);
    return clown
}

function drawLowerBody(limbR, limbH, chestR) {
    lowerBody = new THREE.Object3D();
    var leftFootLeg = new THREE.Object3D();
    var legM = new THREE.MeshBasicMaterial({
        color: 0xF022D8
    });
    var legG = new THREE.CylinderGeometry(limbR, limbR, limbH, 20, 20);
    var legL = new THREE.Mesh(legG, legM);
    legL.translateY(limbH / 2);
    leftFootLeg.add(legL);
    var footG = new THREE.SphereGeometry(limbR * 3, 20, 20, 0, Math.PI);
    var footM = new THREE.MeshBasicMaterial({
        color: 0x22F0B2
    });
    var foot = new THREE.Mesh(footG, footM);
    foot.rotation.x = -Math.PI / 2;
    leftFootLeg.translateX(-(limbR + chestR * .2));
    leftFootLeg.add(foot);
    lowerBody.add(leftFootLeg);
    rightFootLeg = leftFootLeg.clone();
    rightFootLeg.translateX(2 * limbR + chestR * .4);
    lowerBody.add(rightFootLeg);
    return lowerBody
}

function drawTorso(chestR, limbR, limbH) {
    var torso = new THREE.Object3D();
    var chestG = new THREE.SphereGeometry(chestR, 20, 20);
    var chestM = new THREE.MeshBasicMaterial({
        color: 0x00A6FF
    });
    var chest = new THREE.Mesh(chestG, chestM);
    chest.scale.x = .8;
    chest.scale.z = .8;
    torso.add(chest);
    var armL = new THREE.Object3D();
    var forearmM = new THREE.MeshBasicMaterial({
        color: 0x00A6FF
    });
    var forearmG = new THREE.CylinderGeometry(limbR, limbR, limbH, 20, 20);
    var forearm = new THREE.Mesh(forearmG, forearmM);
    var shoulderG = new THREE.SphereGeometry(limbR * 2.5, 20, 20);
    var shoulderM = new THREE.MeshBasicMaterial({
        color: 0xF022D8
    });
    var shoulder = new THREE.Mesh(shoulderG, shoulderM);
    shoulder.translateY((limbH) / 2.0);
    var handG = new THREE.SphereGeometry(limbR * 2, 20, 20);
    var handM = new THREE.MeshBasicMaterial({
        color: 0x22F0B2
    });
    var hand = new THREE.Mesh(handG, handM);
    hand.translateY(-(limbH) / 2.0);
    armL.add(shoulder);
    armL.add(hand);
    armL.add(forearm);
    armL.translateX(-chestR);
    var armR = armL.clone();
    armR.translateX(2 * chestR);
    armR.rotation.z = Math.PI / 8;
    armL.rotation.z = -Math.PI / 8;
    torso.add(armL);
    torso.add(armR);
    return torso
}

function drawHead(headR) {
    var head = new THREE.Object3D();
    var faceG = new THREE.SphereGeometry(headR, 20, 20);
    var faceM = new THREE.MeshBasicMaterial({
        color: 0xB8FFE5
    });
    var face = new THREE.Mesh(faceG, faceM);
    var eyeG = new THREE.SphereGeometry(headR * 0.1, 10, 10);
    var eyeM = new THREE.MeshBasicMaterial({
        color: 0x452469
    });
    var eyeL = new THREE.Mesh(eyeG, eyeM);
    eyeL.translateZ(headR * .95);
    eyeL.translateX(-headR * .35);
    var eyeR = eyeL.clone();
    eyeR.translateX(headR * .7);
    var noseG = new THREE.SphereGeometry(headR * 0.08, 10, 10);
    var nose = new THREE.Mesh(noseG, eyeM);
    nose.translateZ(headR);
    nose.translateY(-headR * .2);
    var earG = new THREE.SphereGeometry(headR * 0.3, 10, 10);
    var earL = new THREE.Mesh(earG, eyeM);
    earL.translateX(headR * .95);
    var earR = earL.clone();
    earR.translateX(-headR * 1.95);
    var mouthG = new THREE.TorusGeometry(headR * .2, headR * .04, 30, 30, 5 * Math.PI / 8);
    var mouthM = new THREE.MeshBasicMaterial({
        color: 0xFFA3E8
    });
    var mouth = new THREE.Mesh(mouthG, mouthM);
    mouth.translateZ(headR * .92);
    mouth.translateY(-headR * .35);
    mouth.rotation.x = Math.PI;
    mouth.rotation.z = Math.PI / 8;
    var hat = new THREE.Object3D();
    var hatM = new THREE.MeshBasicMaterial({
        color: 0x00A6FF
    });
    var topG = new THREE.CylinderGeometry(headR, headR * .8, headR * 1.2, 20, 20);
    var top = new THREE.Mesh(topG, hatM);
    var brimG = new THREE.CylinderGeometry(headR * 1.3, headR * 1.3, headR * .05, 20, 20);
    var brim = new THREE.Mesh(brimG, hatM);
    brim.translateY(-(headR * 1.2) / 2.0);
    hat.add(top);
    hat.add(brim);
    hat.translateY(headR * 1.2);
    hat.translateX(headR * .2);
    hat.rotation.x = -Math.PI / 20;
    hat.rotation.z = -Math.PI / 20;
    head.add(eyeL);
    head.add(eyeR);
    head.add(nose);
    head.add(earL);
    head.add(earR);
    head.add(mouth);
    head.add(face);
    head.add(hat);
    return head
}


var scene = new THREE.Scene();
scene.add(clown);

var renderer = new THREE.WebGLRenderer();

TW.mainInit(renderer,scene);
TW.cameraSetup(renderer,
               scene,
               {minx: -20, maxx: 20,
                miny: 0, maxy: 75,
                minz: -15, maxz: 15});
