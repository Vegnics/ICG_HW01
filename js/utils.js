class CGObject{
    constructor(id=0, name="", trans_vec=null, rotate_vec=null, scale_vec=null, shear_vec=null,orient_vec=null, abs_scale=1.0) {
        
        this.id = id;
        this.name = name;
        
        this.VertexPositionBuffer;
        this.VertexNormalBuffer;
        this.VertexFrontColorBuffer;
        this.vertexTextureCoordBuffer;
        
        this.orientation_vec = orient_vec;
        this.translation_vec = trans_vec;
        this.rotate_vec = rotate_vec;
        this.scale_vec = scale_vec;
        this.absScale = abs_scale;
        this.shear_vec = shear_vec;

        this.mvMatrix = mat4.create();
        this.relmvMatrix = mat4.create();
        this.invOrient = mat4.create();
        this.pMatrix  = mat4.create();
        this.texture  = "NONE";
        // nothingetrreg
    }

    set_translation_vec(trans_vec){  this.translation_vec = trans_vec;}

    set_rotate_vec(rotate_vec){ this.rotate_vec = rotate_vec; }

    set_scale_vec(scale_vec){ this.scale_vec = scale_vec;}

    set_shear_vec(shear_vec){  this.shear_vec = shear_vec; }

    translation(){ mat4.translate(this.mvMatrix, this.translation_vec); }


    orientation(){
        // Use the relative positioning matrixdd
        var _relmvMat = mat4.create(); 
        var ox = degToRad(this.orientation_vec[0]);
        var oy = degToRad(this.orientation_vec[1]);
        var oz = degToRad(this.orientation_vec[2]);
        mat4.rotate(_relmvMat,ox,[1,0,0]);
        mat4.rotate(_relmvMat,oy,[0,1,0]);
        mat4.rotate(_relmvMat,oz,[0,0,1]);
        mat4.inverse(this.invOrient,_relmvMat);
        mat4.multiply(this.relmvMatrix,_relmvMat,mat4.create());
    }

    rotation(){
        var rx = degToRad(this.rotate_vec[0]);
        mat4.rotate(this.mvMatrix, rx, [1, 0, 0]);
        var ry = degToRad(this.rotate_vec[1]);
        mat4.rotate(this.mvMatrix, ry, [0, 1, 0]);
        var rz = degToRad(this.rotate_vec[2]);
        mat4.rotate(this.mvMatrix, rz, [0, 0, 1]);
        //mat4.multiply(this.mvMatrix,this.mvMatrix,this.invOrient);
    }

    scale(){
        var absScaled_vec = [this.absScale,this.absScale,this.absScale]; 
        for(var i=0;i<3;i++){
            absScaled_vec[i]*=this.scale_vec[i];
        }
        mat4.scale(this.relmvMatrix,absScaled_vec); 
    }

    shear(){
        var cotx =  1 / Math.tan(degToRad(this.shear_vec[0]));
        var coty =  1 / Math.tan(degToRad(this.shear_vec[1]));
        var cotz =  1 / Math.tan(degToRad(this.shear_vec[2]));
        mat4.multiply(this.mvMatrix, mat4.create([1, 0, cotz, 0, cotx, 1, 0, 0, 0, coty, 1, 0, 0, 0, 0, 1]));
    }

    merge(){
        // Merge transformati  ons
        // asdsd
        //mat4.multiply(this.mvMatrix,this.mvMatrix,this.invOrient);
        mat4.multiply(this.mvMatrix,this.mvMatrix,this.relmvMatrix);
    }
}

class LightObject{
    constructor(position=null, color=null) {
        this.position = position;
        this.color = color;
    }

    set_position(position){
        this.position = position;
    }

    set_color(color){
        this.color = color;
    }
}

class LightArray{
    lights = []
    
    add_light(light){
        this.lights.push(light);
    }

    size(){
        return this.lights.length;
    }

    access_light(idx){
        if(idx >= this.size()){
            throw 'index out of limited.';
        }

        return this.lights[idx];
    }
}