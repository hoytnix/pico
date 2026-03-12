// src/lib/fileSystem.ts

/**
 * Prompts the user to select a local directory on their hard drive.
 * Requests 'readwrite' permission so Alchememe can stream diffs directly to the files.
 */
export async function requestProjectDirectory(): Promise<FileSystemDirectoryHandle | null> {
  try {
    // This triggers the native OS folder picker
    const dirHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
    });
    
    return dirHandle;
  } catch (error) {
    console.warn('User canceled directory selection or permission denied.', error);
    return null;
  }
}