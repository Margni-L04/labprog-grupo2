import java.util.concurrent.ForkJoinPool;

public class Main {
    public static void main(String[] args) {
        //creamos los pokemones
        Pokemon[] pokemones = {
            new Pokemon("Pikachu", 0.4, 35, 5),
            new Pokemon("Charmander", 0.3, 39, 7),
            new Pokemon("Bulbasaur", 0.4, 45, 8),
            new Pokemon("Squirtle", 4.4, 44, 6),
            new Pokemon("Jigglypuff", 0.2, 115, 10),
            new Pokemon("Meowth", 0.4, 40, 6),
            new Pokemon("Psyduck", 0.5, 50, 7),
            new Pokemon("Gengar", 0.5, 70, 9)
        };

        //creamos las estrategias
        Strategy[] estrategias = {
            new StrategyAtacar(),
            new StrategyCurar(),
            new StrategyAumentarNivel()
        };

        Batalla superPoketorneo = new Batalla(pokemones, estrategias, 0, pokemones.length - 1);
        ForkJoinPool pool = new ForkJoinPool();
        pool.invoke(superPoketorneo);

        System.out.println("El ganador es...");
        System.out.println(superPoketorneo.getPokeganador().getNombre() + "!");
    }
}
