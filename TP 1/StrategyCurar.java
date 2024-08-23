import java.util.Random;

public class StrategyCurar extends Strategy {
    
    public void accion(Pokemon pokeyo, Pokemon pokenemigo) {
        //metodo que cura a pokeyo
        Random rand = new Random();
        int nivelPoke = pokeyo.getNivelPicante();

        //la vida que aumentamos es un numero de 1 a 5, y depende del nivel de pokeyo
        int vida = rand.nextInt(1, 6) * nivelPoke;

        pokeyo.cambiarVida(vida);

        System.out.println(pokeyo.getNombre() + " se cura " + vida + " de HP");
        System.out.println("No tiene efecto sobre " + pokenemigo.getNombre());
    }
}