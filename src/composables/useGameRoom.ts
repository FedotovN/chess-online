import { useToast } from "kneekeetah-vue-ui-kit";
export default function useGameRoom(roomId: string) {
    const { join, currGame } = useGame();
    const { add } = useToast()
    const loading = ref(true);
    useAuth().onAuthResolve(async user => {
        if (!user) {
            add({ content: "Let's login first!", color: "secondary", delay: 5000 });
            return navigateTo("/auth/login");
        }
        try {
            await join(roomId as string);
            add({ content: `You've connected to the game`, color: "primary", delay: 5000 });
            loading.value = false;
            
        } catch (e) {
            await navigateTo("/");
            add({ content: `Error while connecting to the game`, color: "alert", delay: 5000 });
            console.error(e);
        }
    });
    return { loading }
}