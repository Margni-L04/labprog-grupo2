import java.util.Random;

public class StrategyAumentarNivel extends Strategy {
    
    public void accion(Pokemon pokeyo, Pokemon pokenemigo) {
        //metodo cambia el nivel del pokeyo
        Random rand = new Random();

        //podemos sumar o restar el nivel de pokeyo (en 1) o quedarse igual
        int nivel = rand.nextInt(-1, 2);

        pokeyo.cambiarNivel(nivel);

        if(nivel < 0) {
            System.out.println("Mala suerte " + pokeyo.getNombre() + "! "
                + "Se te ha restado un nivel");
        } else if(nivel > 0) {
            System.out.println("Que suerte " + pokeyo.getNombre() + "! "
                + "Se te ha aumentado un nivel");
        } else {
            System.out.println("Ni fu ni fa " + pokeyo.getNombre() + ". "
                + "Seguis con el mismo nivel");
        }

        System.out.println("No tiene efecto sobre " + pokenemigo.getNombre());
    }
}