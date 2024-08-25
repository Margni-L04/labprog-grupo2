import java.util.concurrent.RecursiveAction;
import java.util.Random;

public class Batalla extends RecursiveAction {
    Pokemon[] pokemones;
    Strategy[] estrategias;
    Pokemon pokeganador;
    int inicio;
    int fin;

    public Batalla(Pokemon[] pokemones, Strategy[] estrategias, int inicio, int fin) {
        this.pokemones = pokemones;
        this.estrategias = estrategias;
        this.inicio = inicio;
        this.fin = fin;
    }

    public Pokemon getPokeganador() {
        return this.pokeganador;
    }

    protected void compute() {
        //si queda un solo pokemon, es el pokeganador!
        if (inicio == fin) {
            pokeganador = pokemones[inicio];
        } else if (fin - inicio == 1) {
            //quedan dos pokemones, los enfrentamos
            pokeganador = luchar(pokemones[inicio], pokemones[fin]);
        } else {
            //sino, dividimos a los pokemones en dos mitades y los enfrentamos entre ellos
            int mitad = (inicio + fin) / 2;
            Batalla guerra1 = new Batalla(pokemones, estrategias, inicio, mitad);
            Batalla guerra2 = new Batalla(pokemones, estrategias, mitad + 1, fin);
            invokeAll(guerra1, guerra2);

            //y enfrentamos los ganadores de las dos mitades
            pokeganador = luchar(guerra1.getPokeganador(), guerra2.getPokeganador());
        }
    }

    public Pokemon luchar(Pokemon poke1, Pokemon poke2) {
        //pelea de los pokemones hasta la muerte de uno
        boolean termino = false;
        Random rand = new Random();
        int turno = rand.nextInt(0, 2);
        int cantEstrategias = estrategias.length;
        int accion;
        Pokemon ganador;

        while (!termino) {
            //para saber que estrategia le toca al pokemon realizar
            accion = rand.nextInt(0, cantEstrategias);

            if(turno == 0) {
                poke1.setEstrategia(estrategias[accion]);

                poke1.realizarAccion(poke2);
                turno = 1;

                if(poke2.murio()) {
                    termino = true;
                }
            } else {
                poke2.setEstrategia(estrategias[accion]);

                poke2.realizarAccion(poke1);
                turno = 0;

                if(poke1.murio()) {
                    termino = true;
                }
            }
        }

        //retornamos el pokemon ganador
        if(poke1.murio()) {
            ganador = poke2;
            System.out.println(poke2.getNombre() + " le gano a " + poke1.getNombre());
        } else {
            ganador = poke1;
            System.out.println(poke1.getNombre() + " le gano a " + poke2.getNombre());
        }

        return ganador;
    }
}
