import java.util.Random;

public class StrategyAtacar extends Strategy {
    
    public void accion(Pokemon pokeyo, Pokemon pokenemigo) {
        //metodo que dania al pokenemigo
        Random rand = new Random();
        int nivelPoke = pokeyo.getNivelPicante();
        double deff = pokenemigo.getDefensa();

        //el danio que recibe es un numero entre 1 y 10 multiplicado por el nivel de pokeyo
        //la defensa del pokenemigo reduce el danio que recibira
        int danio = (int)(-1 * (rand.nextInt(1, 11) * nivelPoke) * (1-deff));

        pokenemigo.cambiarVida(danio);

        System.out.println(pokeyo.getNombre() + " ataca a " + pokenemigo.getNombre()
             + " y le resta " + danio + " de HP");
    }
}