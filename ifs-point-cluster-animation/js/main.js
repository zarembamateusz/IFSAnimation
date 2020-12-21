import * as THREE from '../three/three.module.js';
import {OrbitControls} from "../three/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const light = new THREE.AmbientLight(0xFFFFFF);
scene.add(light);

const light2 = new THREE.SpotLight(0xFFFFFF, 3);
light2.position.set(25, 50, 50);
light2.target.position.set(0, 0, 0);
scene.add(light2);

camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 5

const offsetX = 0;
const offsetY = -2;
const offsetZ = 0;

const transition = true;
const number = 10000;

const spheres = [];
const frames = 250;
let currentFrame = 0;


let drawn = false;
const addSphere = (x = 0, y = 0, z = 0, color = 0xffffff) => {
    const geometry = new THREE.CubeGeometry(0.01, 0.01, 0.01);


    const material = new THREE.MeshBasicMaterial({color: `rgb(${Math.floor(Math.abs(x) / 1.0 * 255)}, ${Math.floor(Math.abs(y) / 4.0 * 255)}, ${Math.floor(Math.abs(z) / 1.0 * 255)})`});
    // const material = new THREE.MeshBasicMaterial({color});
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.setX(x + offsetX);
    sphere.position.setY(y + offsetY);
    sphere.position.setZ(z + offsetZ);


    scene.add(sphere);

    return sphere;

}

const arrangeSpheres = (x, y, z) => {
    if (spheres.length === 0) {
        for (let i = 0; i < number; i++) {
            const sphere = addSphere(x[i], y[i], z[i]);
            spheres.push(sphere);
        }
    } else {
        for (let i = 0; i < number; i++) {
            spheres[i].position.x = x[i] + offsetX;
            spheres[i].position.y = y[i] + offsetY;
            spheres[i].position.z = z[i] + offsetZ;
            spheres[i].material.color = new THREE.Color(`rgb(${Math.floor(Math.abs(x[i]) / 1.0 * 255)}, ${Math.floor(Math.abs(y[i]) / 4.0 * 255)}, ${Math.floor(Math.abs(z[i]) / 1.0 * 255)})`)
        }
    }
}


let keyframe1 = [];
let keyframe2 = [];

const fern1 = [{
    a: 0,
    b: 0,
    c: 0.01,
    d: 0,
    e: 0.26,
    f: 0.0,
    g: 0.0,
    h: 0.0,
    i: 0.5,
    j: 0.0,
    k: 0.0,
    l: 0.0,
    p: 0.01
},
    {
        a: 0.2,
        b: -0.26,
        c: -0.01,
        d: 0.23,
        e: 0.22,
        f: -0.07,
        g: 0.07,
        h: 0.0,
        i: 0.24,
        j: 0.0,
        k: 0.8,
        l: 0.0,
        p: 0.05
    },
    {
        a: -0.25,
        b: 0.28,
        c: 0.01,
        d: 0.26,
        e: 0.24,
        f: -0.07,
        g: 0.07,
        h: 0.0,
        i: 0.24,
        j: 0.0,
        k: 0.22,
        l: 0.0,
        p: 0.05
    },
    {
        a: 0.85,
        b: 0.04,
        c: -0.01,
        d: -0.04,
        e: 0.85,
        f: -0.09,
        g: 0.0,
        h: 0.08,
        i: 0.84,
        j: 0.0,
        k: 0.80,
        l: 0.0,
        p: 0.89
    }]

const fern2 = [{
    a: 0.05,
    b: -0.0,
    c: -0.0,
    d: 0,
    e: 0.6,
    f: 0.0,
    g: -0.0,
    h: -0.0,
    i: 0.05,
    j: 0.0,
    k: 0.0,
    l: 0.0,
    p: 0.01
},
    {
        a: 0.45,
        b: -0.22,
        c: 0.22,
        d: 0.22,
        e: 0.45,
        f: 0.22,
        g: -0.22,
        h: 0.22,
        i: -0.45,
        j: 0.0,
        k: 1.0,
        l: 0.0,
        p: 0.3
    },
    {
        a: -0.45,
        b: 0.22,
        c: -0.22,
        d: 0.22,
        e: 0.45,
        f: 0.22,
        g: 0.22,
        h: -0.22,
        i: 0.45,
        j: 0.0,
        k: 1.25,
        l: 0.0,
        p: 0.3
    },
    {
        a: 0.49,
        b: -0.08,
        c: 0.08,
        d: 0.08,
        e: 0.49,
        f: 0.08,
        g: 0.08,
        h: -0.08,
        i: 0.49,
        j: 0.0,
        k: 2.00,
        l: 0.0,
        p: 0.39
    }]

const sierpinskiGasket = [
    {
        a: 0.5,
        b: 0,
        c: 0,
        d: 0,
        e: 0.5,
        f: 0,
        g: 0,
        h: 0,
        i: 0.5,
        j: 0,
        k: 0,
        l: 0,
        p: 0.2
    },
    {
        a: 0.5,
        b: 0,
        c: 0,
        d: 0,
        e: 0.5,
        f: 0,
        g: 0,
        h: 0,
        i: 0.5,
        j: 0,
        k: 0,
        l: 0.5,
        p: 0.2
    },
    {
        a: 0.5,
        b: 0,
        c: 0,
        d: 0,
        e: 0.5,
        f: 0,
        g: 0,
        h: 0,
        i: 0.5,
        j: 0.5,
        k: 0,
        l: 0.5,
        p: 0.2
    },
    {
        a: 0.5,
        b: 0,
        c: 0,
        d: 0,
        e: 0.5,
        f: 0,
        g: 0,
        h: 0,
        i: 0.5,
        j: 0,
        k: 0,
        l: 0.5,
        p: 0.2
    },
    {
        a: 0.5,
        b: 0,
        c: 0,
        d: 0,
        e: 0.5,
        f: 0,
        g: 0,
        h: 0,
        i: 0.5,
        j: 0.25,
        k: 0.5,
        l: 0.25,
        p: 0.2
    }
]

keyframe1.push(...sierpinskiGasket)
keyframe2.push(...fern1)

if (keyframe1.length < keyframe2.length) {
    keyframe1.push({
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        p: 0
    })
} else if (keyframe2.length < keyframe1.length) {
    keyframe2.push({
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        g: 0,
        h: 0,
        i: 0,
        j: 0,
        k: 0,
        l: 0,
        p: 0
    })
}


const createFractalFromEquations = (equations) => {

    const x = new Array(number).fill(0);
    const y = new Array(number).fill(0);
    const z = new Array(number).fill(0);

    const sortedEquations = equations.sort((a, b) => {
        return a.p - b.p;
    })

    for (let n = 0; n < number; n++) {
        const r = Math.random();
        let p = 0;
        let done = false;

        sortedEquations.forEach(eq => {
            p += eq.p;
            if (r <= p && !done) {
                done = true;
                x[n + 1] = eq.a * x[n] + eq.b * y[n] + eq.c * z[n] + eq.j;
                y[n + 1] = eq.d * x[n] + eq.e * y[n] + eq.f * z[n] + eq.k;
                z[n + 1] = eq.g * x[n] + eq.h * y[n] + eq.i * z[n] + eq.l;
            }
        })

    }

    arrangeSpheres(x, y, z);
}


const renderFrame = () => {
    let currentKeyframe = [];
    if (currentFrame === 0) {
        currentKeyframe = keyframe1;
    } else if (currentFrame === frames) {
        const temp = keyframe2;
        keyframe2 = keyframe1;
        keyframe1 = temp;

        currentKeyframe = keyframe1;
    } else {
        for (let j = 0; j < keyframe1.length; j++) {
            const eq1 = keyframe1[j];
            const eq2 = keyframe2[j];
            const eq3 = {};

            Object.keys(eq1).forEach((key, index) => {

                eq3[key] = (eq2[key] - eq1[key]) * currentFrame / frames + eq1[key];
            })
            currentKeyframe.push(eq3);

        }
    }
    if (transition || !drawn) {
        drawn = true;
        createFractalFromEquations(currentKeyframe)
        currentFrame++;
        if (currentFrame > frames) {
            currentFrame = 0;
        }

    }
}


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    controls.update();
    renderFrame();

    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

animate();
