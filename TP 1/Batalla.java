import java.util.concurrent.RecursiveAction;
import java.util.Random;

public class Batalla extends RecursiveAction {
    Pokemon[] pokemones;
    Strategy[] estrategias;

    public Batalla(Pokemon[] pokemones, Strategy[] estrategias) {
        this.pokemones = pokemones;
        this.estrategias = estrategias;
    }

    protected void compute() {
        //FALTAAAAAAAAAAAAAAAAA
        //y entender como funciona jsjs
    }

    public void luchar(Pokemon poke1, Pokemon poke2) {
        //pelea de los pokemones hasta la muerte de uno
        boolean termino = false;
        Random rand = new Random();
        int turno = rand.nextInt(0, 2);
        int cantEstrategias = estrategias.length;
        int accion;

        while (!termino) {
            //para saber que estrategia le toca al pokemon realizar
            accion = rand.nextInt(0, cantEstrategias);

            if(turno == 0) {
                poke1.setEstrategia(estrategias[accion]);

                poke1.realizarAccion(poke2);
                turno = 1;

                if(poke1.murio()) {
                    termino = true;
                }
            } else {
                poke2.setEstrategia(estrategias[accion]);

                poke2.realizarAccion(poke1);
                turno = 0;

                if(poke2.murio()) {
                    termino = true;
                }
            }
        }

        //habria que ver como detectar el pokemon ganador, capaz devolviendo un booleano
    }
}
