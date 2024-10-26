#!/usr/bin/env node

/**
 * This script resets the project to a blank state by renaming the /app directory
 * to /app-example and creating a new /app directory with index.tsx and _layout.tsx files.
 */

const fs = require('fs').promises;
const path = require('path');

const root = process.cwd();
const oldDirPath = path.join(root, 'app');
const newDirPath = path.join(root, 'app-example');
const newAppDirPath = path.join(root, 'app');

const indexContent = `import { Text, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
`;

const layoutContent = `import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
    </Stack>
  );
}
`;

async function resetProject() {
  try {
    await fs.rename(oldDirPath, newDirPath);
    console.log('/app moved to /app-example.');

    await fs.mkdir(newAppDirPath, { recursive: true });
    console.log('New /app directory created.');

    const indexPath = path.join(newAppDirPath, 'index.tsx');
    await fs.writeFile(indexPath, indexContent);
    console.log('app/index.tsx created.');

    const layoutPath = path.join(newAppDirPath, '_layout.tsx');
    await fs.writeFile(layoutPath, layoutContent);
    console.log('app/_layout.tsx created.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

resetProject();
