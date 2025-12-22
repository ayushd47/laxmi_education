import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings, resetSettingsSection, createBackup, restoreFromBackup } from './data';

export async function GET(request: NextRequest) {
  try {
    const settings = await getSettings();
    return NextResponse.json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { section, data } = body;

    if (!section || !data) {
      return NextResponse.json(
        { success: false, error: 'Section and data are required' },
        { status: 400 }
      );
    }

    if (!['site', 'admin', 'appearance'].includes(section)) {
      return NextResponse.json(
        { success: false, error: 'Invalid section' },
        { status: 400 }
      );
    }

    const updatedSettings = await updateSettings(
      section as 'site' | 'admin' | 'appearance',
      data
    );

    return NextResponse.json({
      success: true,
      message: `${section} settings updated successfully`,
      data: updatedSettings
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'reset') {
      const { section } = body;
      
      if (!['site', 'admin', 'appearance'].includes(section)) {
        return NextResponse.json(
          { success: false, error: 'Invalid section' },
          { status: 400 }
        );
      }

      const resetSettings = await resetSettingsSection(
        section as 'site' | 'admin' | 'appearance'
      );

      return NextResponse.json({
        success: true,
        message: `${section} settings reset to defaults`,
        data: resetSettings
      });
    }

    if (action === 'backup') {
      const backup = await createBackup();

      return NextResponse.json({
        success: true,
        message: 'Backup created successfully',
        data: backup
      });
    }

    if (action === 'restore') {
      const { backupData } = body;
      
      if (!backupData) {
        return NextResponse.json(
          { success: false, error: 'Backup data is required' },
          { status: 400 }
        );
      }

      const restoredSettings = await restoreFromBackup(backupData);
      
      return NextResponse.json({
        success: true,
        message: 'Settings restored from backup',
        data: restoredSettings
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing settings action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process action' },
      { status: 500 }
    );
  }
}
