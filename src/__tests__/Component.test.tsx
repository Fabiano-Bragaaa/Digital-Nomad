import { render, screen } from "@testing-library/react-native";
import { Pressable, Text, View } from "react-native";

function Component({ label, loading }: { label: string; loading: boolean }) {
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Pressable>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}

describe("Component", () => {
  it("should display the label when is not loading", () => {
    render(<Component label="test" loading={false} />);
  
    const element = screen.getByText("test");
  
    expect(element).toBeOnTheScreen();
  });

  it("should display the label when is loading", () => {
    render(<Component label="test" loading={true} />);
  
    const element = screen.getByText(/Loading/i);
  
    expect(element).toBeOnTheScreen();
  });
  
})
