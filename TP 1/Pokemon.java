public class Pokemon {
    //nombre del pokemon para identificarlo
    private String nombre;
    //numero entr 0 y 0.5 que indica el porcentaje de reduccion de danio que recibe
    private double defensa;
    //cantidad de vida que tiene (puede aumentar cuanto se quiera)
    private int vida;
    //nivel del pokemon, este indicara cuanto danio realiza y cuanto se cura (entre 1 y 15)
    private int nivelPicante;
    //la estrategia actual del pokemon
    private Strategy estrategia;
    //indica si el pokemon esta vivo
    private boolean estoyVivo;

    public Pokemon(String nombre, double defensa, int vida, int nivelPicante) {
        //primero realizamos unas verificaciones para no tener numeros incorrectos

        if(defensa > 0.5 || defensa < 0) {
            //si nos pasan un valor incorrecto, lo dejamos sin defensa
            defensa = 0;
        }
        if(vida <= 0) {
            //la vida debe ser positiva (no podemos crear un pokemon muerto)
            vida = 1;
        }
        if(nivelPicante <= 0 || nivelPicante > 15) {
            //el nivel del pokemon debe ser positiva y no puede ser mayor a 15
            nivelPicante = 1;
        }

        this.nombre = nombre;
        this.defensa = defensa;
        this.vida = vida;
        this.nivelPicante = nivelPicante;
        this.estoyVivo = true;
    }

    //---------------GETTERS----------------
    public String getNombre() {
        return this.nombre;
    }

    public double getDefensa() {
        return this.defensa;
    }

    public int getVida() {
        return this.vida;
    }

    public int getNivelPicante() {
        return this.nivelPicante;
    }

    public Strategy getEstrategia() {
        return this.estrategia;
    }

    public boolean murio() {
        return !(this.estoyVivo);
    }

    //---------------SETTERS----------------

    public void setEstrategia(Strategy estrategia) {
        this.estrategia = estrategia;
    }

    //---------------OTROS----------------

    public void realizarAccion(Pokemon poke) {
        //usamos la estrategia, que se aplica al pokemon actual y al enemigo
        this.estrategia.accion(this, poke);
    }

    public void cambiarVida(int cambioVida) {
        vida += cambioVida;

        if(vida <= 0) {
            //si restamos mucha vida y no sigue siendo positiva, morimos
            vida = 0;
            estoyVivo = false;
        }
    }

    public void cambiarNivel(int nivel) {
        nivelPicante += nivel;
        
        if(nivelPicante < 1) {
            //el nivel debe ser positivo
            nivelPicante = 1;
        } else if(nivelPicante > 15) {
            //no permitimos que supere 15
            nivelPicante = 15;
        }
    }
}
