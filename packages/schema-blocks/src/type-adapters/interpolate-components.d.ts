declare module "interpolate-components" {
	export default function( config: {
		mixedString: string;
		components: Record<string, React.ReactElement>;
	} ): React.ReactElement;
}
